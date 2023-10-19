/*
  Warnings:

  - Added the required column `userId` to the `PantryItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PantryItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isOffline" BOOLEAN NOT NULL DEFAULT false,
    "amount" REAL NOT NULL DEFAULT 1,
    "offlineProductId" INTEGER,
    "productId" INTEGER,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "PantryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PantryItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PantryItem" ("amount", "id", "isOffline", "offlineProductId", "productId") SELECT "amount", "id", "isOffline", "offlineProductId", "productId" FROM "PantryItem";
DROP TABLE "PantryItem";
ALTER TABLE "new_PantryItem" RENAME TO "PantryItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
