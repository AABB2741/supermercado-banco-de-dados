-- CreateTable
CREATE TABLE "PantryHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pantryItemId" INTEGER NOT NULL,
    CONSTRAINT "PantryHistory_pantryItemId_fkey" FOREIGN KEY ("pantryItemId") REFERENCES "PantryItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
