/*
  Warnings:

  - You are about to drop the column `controlId` on the `fields` table. All the data in the column will be lost.
  - You are about to drop the column `controlName` on the `fields` table. All the data in the column will be lost.
  - You are about to drop the column `controlType` on the `fields` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `fields` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `fields` table. All the data in the column will be lost.
  - You are about to drop the column `formId` on the `fields` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `fields` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `form_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `form_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `formId` on the `form_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `numberingStyle` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `menu_items` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `menu_items` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `menu_items` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `menu_items` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `control_id` to the `fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `control_name` to the `fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `control_type` to the `fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `form_id` to the `fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `form_id` to the `form_submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numbering_style` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `menu_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "fields" DROP CONSTRAINT "fields_formId_fkey";

-- DropForeignKey
ALTER TABLE "menu_items" DROP CONSTRAINT "menu_items_parentId_fkey";

-- AlterTable
ALTER TABLE "fields" DROP COLUMN "controlId",
DROP COLUMN "controlName",
DROP COLUMN "controlType",
DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "formId",
DROP COLUMN "updatedAt",
ADD COLUMN     "control_id" INTEGER NOT NULL,
ADD COLUMN     "control_name" VARCHAR(36) NOT NULL,
ADD COLUMN     "control_type" VARCHAR(36) NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "form_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "form_submissions" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "formId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "form_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "forms" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "numberingStyle",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "numbering_style" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "menu_items" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "parentId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "parent_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "fields" ADD CONSTRAINT "fields_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "menu_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
