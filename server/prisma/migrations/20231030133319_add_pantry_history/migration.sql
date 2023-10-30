-- CreateTable
CREATE TABLE "PantryHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL DEFAULT 1,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "PantryHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PantryHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
