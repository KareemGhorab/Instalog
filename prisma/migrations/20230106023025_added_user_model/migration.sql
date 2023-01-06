/*
  Warnings:

  - You are about to drop the column `actor_name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `target_name` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "actor_name",
DROP COLUMN "target_name",
ALTER COLUMN "actor_id" DROP NOT NULL,
ALTER COLUMN "target_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
