-- CreateEnum
CREATE TYPE "TestAttemptKind" AS ENUM ('FREE', 'PAID');

-- CreateEnum
CREATE TYPE "PaymentPurpose" AS ENUM ('ENGLISH_TEST_RETAKE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED');

-- CreateTable
CREATE TABLE "TestAttempt" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "kind" "TestAttemptKind" NOT NULL,
    "score" INTEGER NOT NULL,
    "cefr" TEXT NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "subScores" JSONB NOT NULL,
    "answers" JSONB NOT NULL,
    "paymentId" TEXT,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "purpose" "PaymentPurpose" NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "provider" TEXT NOT NULL,
    "providerCheckoutId" TEXT,
    "providerPaymentIntentId" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestAttempt_paymentId_key" ON "TestAttempt"("paymentId");

-- CreateIndex
CREATE INDEX "TestAttempt_profileId_takenAt_idx" ON "TestAttempt"("profileId", "takenAt");

-- CreateIndex
CREATE UNIQUE INDEX "TestAttempt_profileId_number_key" ON "TestAttempt"("profileId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_providerCheckoutId_key" ON "Payment"("providerCheckoutId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_providerPaymentIntentId_key" ON "Payment"("providerPaymentIntentId");

-- CreateIndex
CREATE INDEX "Payment_userId_purpose_status_idx" ON "Payment"("userId", "purpose", "status");

-- AddForeignKey
ALTER TABLE "TestAttempt" ADD CONSTRAINT "TestAttempt_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestAttempt" ADD CONSTRAINT "TestAttempt_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

