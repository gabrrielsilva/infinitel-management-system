/*
  Warnings:

  - You are about to drop the `outra` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "outra" DROP CONSTRAINT "outra_projeto_id_fkey";

-- DropTable
DROP TABLE "outra";

-- CreateTable
CREATE TABLE "ferrovia" (
    "projeto_id" SERIAL NOT NULL,
    "data_prevista" TEXT,
    "reprogramacao" TEXT,
    "atraso" INTEGER,
    "data_real_protocolo" TEXT,
    "sla_x" INTEGER,
    "num_protocolo" TEXT,
    "status_operacional" TEXT,
    "data_aprov_prevista" TEXT,
    "data_aprov_real" TEXT,
    "sla_y" INTEGER,
    "observacoes" TEXT,

    CONSTRAINT "ferrovia_pkey" PRIMARY KEY ("projeto_id")
);

-- AddForeignKey
ALTER TABLE "ferrovia" ADD CONSTRAINT "ferrovia_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "projeto"("id_sgi") ON DELETE RESTRICT ON UPDATE CASCADE;
