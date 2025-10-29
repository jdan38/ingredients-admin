'use client';

import { useEffect, useState } from 'react';

type ServedAd = {
  id: string;
  name: string;
  imageUrl: string;
  clickUrl: string;
  placement: string;
  slotId?: string | null;
};

export default function AdPreview({ slotId, placement }: { slotId?: string; placement?: string }) {
  const [ad, setAd] = useState<ServedAd | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/ads/serve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotId, placement }),
      });
      const data = await res.json();
      setAd(data?.ad ?? null);
    })();
  }, [slotId, placement]);

  if (!ad) {
    return (
      <div className="w-full aspect-video grid place-items-center rounded-lg border border-dashed">
        <span className="text-sm text-gray-500">No ad available</span>
      </div>
    );
  }

  return (
    <a
      href={ad.clickUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg overflow-hidden border"
      aria-label={ad.name}
      title={ad.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ad.imageUrl} alt={ad.name} className="w-full h-auto" />
    </a>
  );
}
