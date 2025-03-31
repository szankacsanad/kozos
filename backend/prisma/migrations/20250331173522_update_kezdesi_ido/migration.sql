-- CreateTable
CREATE TABLE `Koncert` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fellepo` VARCHAR(191) NOT NULL,
    `kezdesiIdo` DATETIME(3) NOT NULL,
    `idotartam` INTEGER NOT NULL,
    `elmaradE` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
