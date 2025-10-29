🧩 Ingredients Admin

A modern Next.js 14 + Prisma + PostgreSQL admin dashboard for managing users, billing, and ads.
Features a collapsible black-themed sidebar, responsive layout, and seeded ad management system.

🚀 Quick Start
1️⃣ Install dependencies
npm install
# or
pnpm install

2️⃣ Set up the database

Create a PostgreSQL database and update your .env file:

DATABASE_URL="postgresql://postgres:password@localhost:6543/ingredients_admin"


💡 If you’re using a remote database (e.g., AWS RDS via SSH tunnel),
make sure to start the tunnel before running the app:

ssh -i ~/Downloads/IngredientAdmin.pem \
  -L 6543:admin.c4jam828o59g.us-east-1.rds.amazonaws.com:5432 \
  ec2-user@54.145.17.100

3️⃣ Run migrations & seed data
npx prisma generate
npx prisma migrate dev --name init
npm run seed


This creates:

An admin user (admin@example.com / admin123)

A default ad slot (diet-page / sidebar)

Sample ads to test the ad-serving system.

4️⃣ Start the development server
npm run dev


Visit: http://localhost:3000

Default login:

email: admin@example.com  
password: admin123

🧱 Project Structure
ingredients-admin/
├── app/
│   ├── admin/             # Admin dashboard pages
│   │   ├── layout.tsx     # Black sidebar + header layout
│   │   ├── page.tsx       # Dashboard overview
│   │   ├── users/         # User management
│   │   ├── billing/       # Billing info
│   │   └── ads/           # Ad slots and creatives
│   └── api/               # Serverless API routes (ads, auth, etc.)
├── components/            # Reusable React components
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── seed.ts            # Seed data script
├── lib/                   # Utility and Prisma client setup
├── public/                # Static assets
└── .env                   # Environment variables

🎨 UI Features

🖤 Dark theme (black sidebar + header, white text)

🧭 Collapsible sidebar

📱 Responsive layout (mobile drawer)

🔍 Search bar, 🔔 notifications, ✉️ messages

👤 User display in header

💡 Hover effects & active link highlighting

⚙️ Environment Variables
Variable	Description
DATABASE_URL	PostgreSQL connection string
NEXTAUTH_SECRET	Secret for NextAuth (if enabled)
NEXTAUTH_URL	Base URL for NextAuth callbacks
APP_URL	Public app URL
STRIPE_SECRET_KEY	Stripe secret (for billing)
STRIPE_WEBHOOK_SECRET	Stripe webhook validation
S3_BUCKET	AWS S3 bucket name (for creatives)
AWS_REGION	AWS region name
☁️ Deployment (AWS App Runner)

Push this repo to GitHub.

In AWS App Runner:

Create a service from source code repository

Choose your branch

Use the included apprunner.yaml for configuration

Link environment variables from AWS Secrets Manager:

DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
APP_URL
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
S3_BUCKET
AWS_REGION

🧑‍💻 Developer Notes

Run Prisma Studio to inspect your DB:

npx prisma studio


Regenerate Prisma client after any schema change:

npx prisma generate


Format and lint code:

npm run lint
npm run format

📸 UI Preview
Dashboard	Ads Page

	
🧾 License

MIT © 2025 J Daniels / Augmented Technologies