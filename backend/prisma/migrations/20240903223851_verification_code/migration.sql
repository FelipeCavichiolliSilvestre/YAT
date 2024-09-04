-- AlterTable
ALTER TABLE `User` ADD COLUMN `verificationCode` CHAR(128) NULL,
    ADD COLUMN `verificationCodeDate` DATETIME(3) NULL,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;
