/*
  Warnings:

  - Added the required column `point` to the `CourseQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseQuestion" ADD COLUMN     "point" INTEGER NOT NULL;
