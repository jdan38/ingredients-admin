-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdCreative" (
    "id" TEXT NOT NULL,
    "storageUrl" TEXT NOT NULL,
    "clickUrl" TEXT NOT NULL,
    "altText" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdCreative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdSlot" (
    "id" TEXT NOT NULL,
    "pageKey" TEXT NOT NULL,
    "positionKey" TEXT NOT NULL,
    "rotate" BOOLEAN NOT NULL DEFAULT true,
    "intervalSeconds" INTEGER NOT NULL DEFAULT 5,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AdSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "recipeId" TEXT,
    "eventType" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecipeEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");
