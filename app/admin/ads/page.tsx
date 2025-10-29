// app/admin/ads/page.tsx
import { prisma } from '@/lib/prisma';
import CreativeUploader from '@/components/ads/CreativeUploader';

export default async function Ads() {
  const slots = await prisma.adSlot.findMany({
    include: { ads: true }, // bring the ads so we can show a count
    orderBy: [{ pageKey: 'asc' }, { positionKey: 'asc' }],
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Ads</h1>

      <div className="grid md:grid-cols-2 gap-3">
        {slots.map((s) => (
          <div key={s.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="mb-2 text-sm text-gray-300">
              <span className="font-semibold">{s.description ?? `${s.pageKey} / ${s.positionKey}`}</span>
              <span className="ml-2 opacity-70">
                ({s.pageKey}/{s.positionKey}) • {s.active ? 'active' : 'inactive'} • {s.ads.length} ads
              </span>
            </div>

            {/* Uploader to add/update creatives for this slot */}
            <CreativeUploader slotId={s.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
