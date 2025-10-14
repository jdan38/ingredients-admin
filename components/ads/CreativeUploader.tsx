'use client';
import { useEffect, useRef, useState } from 'react';
export default function AdPreview({ slotId }:{slotId:string}){
const [ad,setAd]=useState<any>(null);const t=useRef<any>();
async function fetchAd(){
const r=await fetch('/api/ads/serve',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({slotId})});
const j=await r.json();setAd(j); if(j.rotate){clearTimeout(t.current);t.current=setTimeout(fetchAd,(j.ttl||5)*1000);} }
useEffect(()=>{fetchAd();return()=>clearTimeout(t.current);},[slotId]);
if(!ad||ad.none) return <div className="border rounded p-4 text-sm text-gray-500">No creative</div>;
// eslint-disable-next-line @next/next/no-img-element
return <a href={ad.clickUrl} target="_blank"><img src={ad.creativeUrl} alt="ad"/></a>;
}