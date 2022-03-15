/*
  Warnings:

  - The primary key for the `energia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_sgi` on the `energia` table. All the data in the column will be lost.
  - The primary key for the `executivo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_sgi` on the `executivo` table. All the data in the column will be lost.
  - The primary key for the `observacoes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_sgi` on the `observacoes` table. All the data in the column will be lost.
  - The primary key for the `outra` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_sgi` on the `outra` table. All the data in the column will be lost.
  - The primary key for the `prefeitura` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_sgi` on the `prefeitura` table. All the data in the column will be lost.
  - The primary key for the `rodovia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_sgi` on the `rodovia` table. All the data in the column will be lost.
  - You are about to drop the `gerencial` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[projeto_id]` on the table `energia` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projeto_id]` on the table `executivo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projeto_id]` on the table `observacoes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projeto_id]` on the table `outra` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projeto_id]` on the table `prefeitura` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projeto_id]` on the table `rodovia` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `energia` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `projeto_id` to the `energia` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `executivo` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `projeto_id` to the `executivo` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `observacoes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `projeto_id` to the `observacoes` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `outra` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `projeto_id` to the `outra` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `prefeitura` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `projeto_id` to the `prefeitura` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `rodovia` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `projeto_id` to the `rodovia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "energia" DROP CONSTRAINT "energia_pkey",
DROP COLUMN "id_sgi",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "projeto_id" INTEGER NOT NULL,
ADD CONSTRAINT "energia_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "executivo" DROP CONSTRAINT "executivo_pkey",
DROP COLUMN "id_sgi",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "projeto_id" INTEGER NOT NULL,
ADD CONSTRAINT "executivo_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "observacoes" DROP CONSTRAINT "observacoes_pkey",
DROP COLUMN "id_sgi",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "projeto_id" INTEGER NOT NULL,
ADD CONSTRAINT "observacoes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "outra" DROP CONSTRAINT "outra_pkey",
DROP COLUMN "id_sgi",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "projeto_id" INTEGER NOT NULL,
ADD CONSTRAINT "outra_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "prefeitura" DROP CONSTRAINT "prefeitura_pkey",
DROP COLUMN "id_sgi",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "projeto_id" INTEGER NOT NULL,
ADD CONSTRAINT "prefeitura_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "rodovia" DROP CONSTRAINT "rodovia_pkey",
DROP COLUMN "id_sgi",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "projeto_id" INTEGER NOT NULL,
ADD CONSTRAINT "rodovia_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "gerencial";

-- CreateTable
CREATE TABLE "projeto" (
    "id_sgi" SERIAL NOT NULL,
    "nome_projeto" TEXT NOT NULL,
    "tipo_projeto" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "status_sgi" TEXT NOT NULL,

    CONSTRAINT "projeto_pkey" PRIMARY KEY ("id_sgi")
);

-- CreateIndex
CREATE UNIQUE INDEX "projeto_nome_projeto_key" ON "projeto"("nome_projeto");

-- CreateIndex
CREATE UNIQUE INDEX "energia_projeto_id_key" ON "energia"("projeto_id");

-- CreateIndex
CREATE UNIQUE INDEX "executivo_projeto_id_key" ON "executivo"("projeto_id");

-- CreateIndex
CREATE UNIQUE INDEX "observacoes_projeto_id_key" ON "observacoes"("projeto_id");

-- CreateIndex
CREATE UNIQUE INDEX "outra_projeto_id_key" ON "outra"("projeto_id");

-- CreateIndex
CREATE UNIQUE INDEX "prefeitura_projeto_id_key" ON "prefeitura"("projeto_id");

-- CreateIndex
CREATE UNIQUE INDEX "rodovia_projeto_id_key" ON "rodovia"("projeto_id");

-- AddForeignKey
ALTER TABLE "executivo" ADD CONSTRAINT "executivo_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "projeto"("id_sgi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prefeitura" ADD CONSTRAINT "prefeitura_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "projeto"("id_sgi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "energia" ADD CONSTRAINT "energia_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "projeto"("id_sgi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rodovia" ADD CONSTRAINT "rodovia_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "projeto"("id_sgi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outra" ADD CONSTRAINT "outra_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "projeto"("id_sgi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observacoes" ADD CONSTRAINT "observacoes_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "projeto"("id_sgi") ON DELETE RESTRICT ON UPDATE CASCADE;
