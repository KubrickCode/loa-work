-- AlterTable
ALTER TABLE "content_reward" ALTER COLUMN "default_average_quantity" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "content_see_more_reward" ALTER COLUMN "quantity" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "user_content_reward" ADD COLUMN "is_sellable" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "average_quantity" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "user_content_see_more_reward" ALTER COLUMN "quantity" SET DEFAULT 0;

INSERT INTO "content_reward" (
    "content_id", 
    "content_reward_item_id", 
    "created_at", 
    "updated_at"
)
SELECT 
    c.id,
    cri.id,
    NOW(),
    NOW()
FROM "content" c
CROSS JOIN "content_reward_item" cri
ON CONFLICT ("content_id", "content_reward_item_id") DO NOTHING;

UPDATE "user_content_reward" 
SET "is_sellable" = cr."is_sellable",
    "updated_at" = NOW()
FROM "content_reward" cr
WHERE "user_content_reward"."content_reward_id" = cr.id;

INSERT INTO "user_content_reward" (
    "user_id",
    "content_reward_id",
    "created_at",
    "updated_at"
)
SELECT 
    u.id,
    cr.id,
    NOW(),
    NOW()
FROM "user" u
CROSS JOIN "content_reward" cr
ON CONFLICT ("user_id", "content_reward_id") DO NOTHING;

INSERT INTO "content_see_more_reward" (
    "content_id",
    "content_reward_item_id",
    "created_at",
    "updated_at"
)
SELECT 
    c.id,
    cri.id,
    NOW(),
    NOW()
FROM "content" c
CROSS JOIN "content_reward_item" cri
WHERE EXISTS (
    SELECT 1 FROM "content_see_more_reward" existing_csmr 
    WHERE existing_csmr."content_id" = c.id
)
AND NOT EXISTS (
    SELECT 1 FROM "content_see_more_reward" csmr 
    WHERE csmr."content_id" = c.id 
    AND csmr."content_reward_item_id" = cri.id
);

INSERT INTO "user_content_see_more_reward" (
    "user_id",
    "content_see_more_reward_id",
    "created_at",
    "updated_at"
)
SELECT 
    u.id,
    csmr.id,
    NOW(),
    NOW()
FROM "user" u
CROSS JOIN "content_see_more_reward" csmr
ON CONFLICT ("user_id", "content_see_more_reward_id") DO NOTHING;
