-- CreateTable
CREATE TABLE "user_content_see_more_reward" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "is_edited" BOOLEAN NOT NULL DEFAULT false,
    "quantity" DECIMAL(65,30) NOT NULL,
    "content_see_more_reward_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_content_see_more_reward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_content_see_more_reward_user_id_content_see_more_rewar_key" ON "user_content_see_more_reward"("user_id", "content_see_more_reward_id");

-- AddForeignKey
ALTER TABLE "user_content_see_more_reward" ADD CONSTRAINT "user_content_see_more_reward_content_see_more_reward_id_fkey" FOREIGN KEY ("content_see_more_reward_id") REFERENCES "content_see_more_reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_content_see_more_reward" ADD CONSTRAINT "user_content_see_more_reward_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "user_content_see_more_reward" ("created_at", "updated_at", "is_edited", "quantity", "content_see_more_reward_id", "user_id")
SELECT 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
    false, 
    csmr.quantity, 
    csmr.id, 
    u.id
FROM 
    "content_see_more_reward" csmr
CROSS JOIN 
    "user" u;
