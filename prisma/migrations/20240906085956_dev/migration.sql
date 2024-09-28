-- CreateTable
CREATE TABLE "resources_item" (
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT,
    "start" TIMESTAMPTZ(6),
    "end" TIMESTAMPTZ(6),
    "className" VARCHAR,
    "group" VARCHAR,
    "title" VARCHAR,

    CONSTRAINT "resources_item_pkey" PRIMARY KEY ("id")
);
