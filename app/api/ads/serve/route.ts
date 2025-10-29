import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';        // your existing prisma singleton
import type { Ad } from '@prisma/client';

type AdLite = Pick<Ad, 'id' | 'name' | 'imageUrl' | 'clickUrl' | 'weight' | 'placement' | 'slotId'>;

function pickWeighted<T extends { weight: number }>(items: T[]): T {
  const total = items.reduce((s, i) => s + Math.max(1, i.weight), 0);
  let r = Math.floor(Math.random() * total);
  for (const it of items) {
    r -= Math.max(1, it.weight);
    if (r < 0) return it;
  }
  return items[items.length - 1];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const placement = typeof body?.placement === 'string' ? body.placement : undefined;
    const slotId = typeof body?.slotId === 'string' ? body.slotId : undefined;

    const ads = await prisma.ad.findMany({
      where: {
        ...(placement ? { placement } : {}),
        ...(slotId ? { slotId } : {}),
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        clickUrl: true,
        weight: true,
        placement: true,
        slotId: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    if (!ads.length) {
      return NextResponse.json({ ok: false, ad: null }, { status: 404 });
    }

    const chosen = pickWeighted<AdLite>(ads);

    // fire-and-forget: impression + counter
    prisma.$transaction([
      prisma.adImpression.create({
        data: {
          adId: chosen.id,
          slotId: chosen.slotId ?? null,
          placement: placement ?? chosen.placement ?? null,
        },
      }),
      prisma.ad.update({
        where: { id: chosen.id },
        data: { impressionsCount: { increment: 1 } },
      }),
    ]).catch(() => {});

    return NextResponse.json({
      ok: true,
      ad: {
        id: chosen.id,
        name: chosen.name,
        imageUrl: chosen.imageUrl,
        clickUrl: chosen.clickUrl,
        placement: chosen.placement,
        slotId: chosen.slotId,
      },
    });
  } catch (err) {
    console.error('ads/serve error', err);
    return NextResponse.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 });
  }
}

// Optional GET for quick browser smoke-test
export async function GET() {
  return NextResponse.json({ ok: true, ad: null });
}
