-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentClass" (
    "id" SERIAL NOT NULL,
    "student_id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,

    CONSTRAINT "StudentClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JoinCode" (
    "code" TEXT NOT NULL DEFAULT substr(md5(random()::text), 0, 7),
    "classId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JoinCode_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Discussion" (
    "id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Discussion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "poster_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "discussion_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "id" TEXT NOT NULL,
    "from_id" TEXT NOT NULL,
    "to_id" TEXT NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JoinCode_classId_key" ON "JoinCode"("classId");

-- AddForeignKey
ALTER TABLE "StudentClass" ADD CONSTRAINT "StudentClass_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinCode" ADD CONSTRAINT "JoinCode_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_discussion_id_fkey" FOREIGN KEY ("discussion_id") REFERENCES "Discussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "Response"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "Response"("id") ON DELETE CASCADE ON UPDATE CASCADE;

