/*
  Warnings:

  - A unique constraint covering the columns `[classId]` on the table `JoinCode` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "JoinCode" ALTER COLUMN "code" SET DEFAULT substr(md5(random()::text), 0, 5);

-- CreateIndex
CREATE UNIQUE INDEX "JoinCode_classId_key" ON "JoinCode"("classId");
