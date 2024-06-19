-- CreateTable
CREATE TABLE "SubNote" (
    "id" SERIAL NOT NULL,
    "noteId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubNote" ADD CONSTRAINT "SubNote_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
