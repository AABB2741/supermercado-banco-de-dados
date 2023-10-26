/*
  Warnings:

  - You are about to drop the `PantryHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `isOffline` on the `ListItem` table. All the data in the column will be lost.
  - You are about to drop the column `offlineProductId` on the `ListItem` table. All the data in the column will be lost.
  - You are about to drop the column `isOffline` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isOffline` on the `PantryItem` table. All the data in the column will be lost.
  - You are about to drop the column `offlineProductId` on the `PantryItem` table. All the data in the column will be lost.
  - Made the column `productId` on table `ListItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `PantryItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PantryHistory";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ListItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "amount" REAL NOT NULL DEFAULT 1,
    "listId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "ListItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ListItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ListItem" ("amount", "checked", "id", "listId", "productId") SELECT "amount", "checked", "id", "listId", "productId" FROM "ListItem";
DROP TABLE "ListItem";
ALTER TABLE "new_ListItem" RENAME TO "ListItem";
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "dueTime" INTEGER,
    "brand" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("brand", "dueTime", "id", "name", "price", "userId") SELECT "brand", "dueTime", "id", "name", "price", "userId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_PantryItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL DEFAULT 1,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "PantryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PantryItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PantryItem" ("amount", "id", "productId", "userId") SELECT "amount", "id", "productId", "userId" FROM "PantryItem";
DROP TABLE "PantryItem";
ALTER TABLE "new_PantryItem" RENAME TO "PantryItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
