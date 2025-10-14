import { prisma } from '@/lib/prisma';
import AdPreview from '@/components/ads/AdPreview';
import CreativeUploader from '@/components/ads/CreativeUploader';
export default async function Ads(){
const slots = await prisma.adSlot.findMany();
return (<div className="space-y-4"><h1 className="text-2xl font-semibold">Ads</h1><CreativeUploader/>
<div className="grid md:grid-cols-2 gap-3">{slots.map(s=>(<div key={s.id} className="bg-white p-4 rounded-xl shadow"><div className="mb-2 font-medium">{s.pageKey}:{s.positionKey}</div><AdPreview slotId={s.id}/></div>))}</div></div>);
}
