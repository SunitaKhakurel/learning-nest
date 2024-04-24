-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "authorEmail" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_authorEmail_key" ON "Book"("authorEmail");
