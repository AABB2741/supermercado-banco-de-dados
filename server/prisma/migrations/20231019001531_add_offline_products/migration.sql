/*
  Warnings:

  - You are about to drop the column `offlineProductId` on the `ListItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ListItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "amount" REAL NOT NULL DEFAULT 1,
    "isOffline" BOOLEAN NOT NULL DEFAULT false,
    "listId" INTEGER NOT NULL,
    "productId" INTEGER,
    CONSTRAINT "ListItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ListItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ListItem" ("amount", "checked", "id", "isOffline", "listId", "productId") SELECT "amount", "checked", "id", "isOffline", "listId", "productId" FROM "ListItem";
DROP TABLE "ListItem";
ALTER TABLE "new_ListItem" RENAME TO "ListItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
