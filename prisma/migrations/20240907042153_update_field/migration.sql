/*
  Warnings:

  - You are about to drop the column `uuid` on the `resources_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "resources_item" DROP COLUMN "uuid",
ADD COLUMN     "iid" UUID;
