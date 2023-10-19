-- CreateTable
CREATE TABLE "PantryItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isOffline" BOOLEAN NOT NULL DEFAULT false,
    "amount" REAL NOT NULL DEFAULT 1,
    "offlineProductId" INTEGER,
    "productId" INTEGER,
    CONSTRAINT "PantryItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
