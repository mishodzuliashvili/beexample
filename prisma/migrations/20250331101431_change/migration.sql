/*
  Warnings:

  - The values [SUSPENDED,PEDNING] on the enum `GroupMemberStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Reaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('ACTIVE', 'PENDING', 'DELETED');

-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'LOVE', 'HAHA', 'WOW', 'SAD', 'ANGRY');

-- AlterEnum
BEGIN;
CREATE TYPE "GroupMemberStatus_new" AS ENUM ('ACTIVE', 'BANNED', 'PENDING');
ALTER TABLE "GroupMember" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "GroupMember" ALTER COLUMN "status" TYPE "GroupMemberStatus_new" USING ("status"::text::"GroupMemberStatus_new");
ALTER TYPE "GroupMemberStatus" RENAME TO "GroupMemberStatus_old";
ALTER TYPE "GroupMemberStatus_new" RENAME TO "GroupMemberStatus";
DROP TYPE "GroupMemberStatus_old";
ALTER TABLE "GroupMember" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PostType" ADD VALUE 'CONFESSION';
ALTER TYPE "PostType" ADD VALUE 'RANT';
ALTER TYPE "PostType" ADD VALUE 'QUESTION';
ALTER TYPE "PostType" ADD VALUE 'COMPLIMENT';
ALTER TYPE "PostType" ADD VALUE 'SECRET_CRUSH';
ALTER TYPE "PostType" ADD VALUE 'MEME';
ALTER TYPE "PostType" ADD VALUE 'STORY';
ALTER TYPE "PostType" ADD VALUE 'SHOUTOUT';
ALTER TYPE "PostType" ADD VALUE 'LOST_FOUND';
ALTER TYPE "PostType" ADD VALUE 'EVENT_PROMO';
ALTER TYPE "PostType" ADD VALUE 'ROOMMATE_REQUEST';
ALTER TYPE "PostType" ADD VALUE 'COMPLAINT';
ALTER TYPE "PostType" ADD VALUE 'ADVICE';
ALTER TYPE "PostType" ADD VALUE 'OTHER';

-- DropForeignKey
ALTER TABLE "GroupMember" DROP CONSTRAINT "GroupMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "OwnedGroup" DROP CONSTRAINT "OwnedGroup_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_userId_fkey";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "doesJoinNeedsApproval" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "doesPostRequireApproval" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDiscoverable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "GroupMember" ADD COLUMN     "lastPostCreatedAt" TIMESTAMP(3),
ADD COLUMN     "suspendedUntil" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorId",
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "type",
ADD COLUMN     "type" "ReactionType" NOT NULL;

-- CreateTable
CREATE TABLE "GroupModerator" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "permissions" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupModerator_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupModerator" ADD CONSTRAINT "GroupModerator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupModerator" ADD CONSTRAINT "GroupModerator_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnedGroup" ADD CONSTRAINT "OwnedGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
