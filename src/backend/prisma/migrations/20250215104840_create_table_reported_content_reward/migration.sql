-- CreateTable
CREATE TABLE "reported_content_reward" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "average_quantity" DECIMAL(65,30) NOT NULL,
    "content_reward_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "reported_content_reward_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reported_content_reward" ADD CONSTRAINT "reported_content_reward_content_reward_id_fkey" FOREIGN KEY ("content_reward_id") REFERENCES "content_reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reported_content_reward" ADD CONSTRAINT "reported_content_reward_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
