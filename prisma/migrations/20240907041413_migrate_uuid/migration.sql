-- AlterTable
ALTER TABLE "resources_item" ADD COLUMN     "uuid" UUID NOT NULL DEFAULT gen_random_uuid();
