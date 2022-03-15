/*
  Warnings:

  - The primary key for the `energia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `energia` table. All the data in the column will be lost.
  - The primary key for the `executivo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `executivo` table. All the data in the column will be lost.
  - The primary key for the `observacoes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `observacoes` table. All the data in the column will be lost.
  - The primary key for the `outra` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `outra` table. All the data in the column will be lost.
  - The primary key for the `prefeitura` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `prefeitura` table. All the data in the column will be lost.
  - The primary key for the `rodovia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `rodovia` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "energia_projeto_id_key";

-- DropIndex
DROP INDEX "executivo_projeto_id_key";

-- DropIndex
DROP INDEX "observacoes_projeto_id_key";

-- DropIndex
DROP INDEX "outra_projeto_id_key";

-- DropIndex
DROP INDEX "prefeitura_projeto_id_key";

-- DropIndex
DROP INDEX "rodovia_projeto_id_key";

-- AlterTable
CREATE SEQUENCE "energia_projeto_id_seq";
ALTER TABLE "energia" DROP CONSTRAINT "energia_pkey",
DROP COLUMN "id",
ALTER COLUMN "projeto_id" SET DEFAULT nextval('energia_projeto_id_seq'),
ADD CONSTRAINT "energia_pkey" PRIMARY KEY ("projeto_id");
ALTER SEQUENCE "energia_projeto_id_seq" OWNED BY "energia"."projeto_id";

-- AlterTable
CREATE SEQUENCE "executivo_projeto_id_seq";
ALTER TABLE "executivo" DROP CONSTRAINT "executivo_pkey",
DROP COLUMN "id",
ALTER COLUMN "projeto_id" SET DEFAULT nextval('executivo_projeto_id_seq'),
ADD CONSTRAINT "executivo_pkey" PRIMARY KEY ("projeto_id");
ALTER SEQUENCE "executivo_projeto_id_seq" OWNED BY "executivo"."projeto_id";

-- AlterTable
CREATE SEQUENCE "observacoes_projeto_id_seq";
ALTER TABLE "observacoes" DROP CONSTRAINT "observacoes_pkey",
DROP COLUMN "id",
ALTER COLUMN "projeto_id" SET DEFAULT nextval('observacoes_projeto_id_seq'),
ADD CONSTRAINT "observacoes_pkey" PRIMARY KEY ("projeto_id");
ALTER SEQUENCE "observacoes_projeto_id_seq" OWNED BY "observacoes"."projeto_id";

-- AlterTable
CREATE SEQUENCE "outra_projeto_id_seq";
ALTER TABLE "outra" DROP CONSTRAINT "outra_pkey",
DROP COLUMN "id",
ALTER COLUMN "projeto_id" SET DEFAULT nextval('outra_projeto_id_seq'),
ADD CONSTRAINT "outra_pkey" PRIMARY KEY ("projeto_id");
ALTER SEQUENCE "outra_projeto_id_seq" OWNED BY "outra"."projeto_id";

-- AlterTable
CREATE SEQUENCE "prefeitura_projeto_id_seq";
ALTER TABLE "prefeitura" DROP CONSTRAINT "prefeitura_pkey",
DROP COLUMN "id",
ALTER COLUMN "projeto_id" SET DEFAULT nextval('prefeitura_projeto_id_seq'),
ADD CONSTRAINT "prefeitura_pkey" PRIMARY KEY ("projeto_id");
ALTER SEQUENCE "prefeitura_projeto_id_seq" OWNED BY "prefeitura"."projeto_id";

-- AlterTable
CREATE SEQUENCE "rodovia_projeto_id_seq";
ALTER TABLE "rodovia" DROP CONSTRAINT "rodovia_pkey",
DROP COLUMN "id",
ALTER COLUMN "projeto_id" SET DEFAULT nextval('rodovia_projeto_id_seq'),
ADD CONSTRAINT "rodovia_pkey" PRIMARY KEY ("projeto_id");
ALTER SEQUENCE "rodovia_projeto_id_seq" OWNED BY "rodovia"."projeto_id";
