# Quick start
1. Install deps: `pnpm i` (or `npm i`)
2. Create Postgres and set `DATABASE_URL` in `.env`
3. `npx prisma migrate dev --name init && pnpm seed`
4. `pnpm dev` → http://localhost:3000 (admin@example.com / admin123)

# Deploy (App Runner source)
- Push this repo to GitHub
- App Runner → Create service from source → use `apprunner.yaml`
- Map env vars from Secrets Manager: DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, APP_URL, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, S3_BUCKET, AWS_REGION