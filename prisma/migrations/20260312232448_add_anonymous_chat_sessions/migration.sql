-- AlterTable
ALTER TABLE "chat_sessions" ADD COLUMN     "ipHash" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "chat_sessions_ipHash_idx" ON "chat_sessions"("ipHash");
