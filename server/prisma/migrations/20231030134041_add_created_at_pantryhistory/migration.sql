-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PantryHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL DEFAULT 1,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "PantryHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PantryHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PantryHistory" ("amount", "id", "productId", "userId") SELECT "amount", "id", "productId", "userId" FROM "PantryHistory";
DROP TABLE "PantryHistory";
ALTER TABLE "new_PantryHistory" RENAME TO "PantryHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
