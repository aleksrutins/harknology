-- AlterTable
ALTER TABLE "JoinCode" ALTER COLUMN "code" SET DEFAULT substr(md5(random()::text), 0, 7);
