-- CreateTable
CREATE TABLE "inbound_emails" (
    "id" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "html" TEXT,
    "text" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inbound_emails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inbound_emails_emailId_key" ON "inbound_emails"("emailId");

-- CreateIndex
CREATE INDEX "inbound_emails_read_idx" ON "inbound_emails"("read");

-- CreateIndex
CREATE INDEX "inbound_emails_createdAt_idx" ON "inbound_emails"("createdAt");
