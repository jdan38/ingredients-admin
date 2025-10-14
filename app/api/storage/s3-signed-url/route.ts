import { NextResponse } from 'next/server';
import { s3 } from '@/lib/aws';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
export async function POST(req: Request){
const { filename, contentType } = await req.json();
const bucket = process.env.S3_BUCKET!; const key = `ads/${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g,'_')}`;
const url = await getSignedUrl(s3, new PutObjectCommand({Bucket: bucket, Key: key, ContentType: contentType}), { expiresIn: 600 });
return NextResponse.json({ url, key });
}
