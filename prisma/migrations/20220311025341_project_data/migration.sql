-- CreateTable
CREATE TABLE "gerencial" (
    "id_sgi" SERIAL NOT NULL,
    "nome_projeto" TEXT NOT NULL,
    "tipo_projeto" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "status_sgi" TEXT NOT NULL,

    CONSTRAINT "gerencial_pkey" PRIMARY KEY ("id_sgi")
);

-- CreateTable
CREATE TABLE "executivo" (
    "id_sgi" SERIAL NOT NULL,
    "data_acionamento" TIMESTAMP(3) NOT NULL,
    "data_aceita_exec" TIMESTAMP(3) NOT NULL,
    "executor" TEXT NOT NULL,
    "status_tim" TEXT,
    "data_tim" TIMESTAMP(3),
    "status_lic_tbr" TEXT NOT NULL,

    CONSTRAINT "executivo_pkey" PRIMARY KEY ("id_sgi")
);

-- CreateTable
CREATE TABLE "prefeitura" (
    "id_sgi" SERIAL NOT NULL,
    "data_prevista" TIMESTAMP(3),
    "reprogramacao" TIMESTAMP(3),
    "atraso" INTEGER,
    "data_real_protocolo" TIMESTAMP(3),
    "sla_x" INTEGER,
    "qtd_prefeitura" INTEGER NOT NULL,
    "num_protocolo" TEXT,
    "status_operacional" TEXT,
    "data_aprov_prevista" TIMESTAMP(3),
    "data_aprov_real" TIMESTAMP(3),
    "sla_y" INTEGER,
    "observacoes" TEXT,

    CONSTRAINT "prefeitura_pkey" PRIMARY KEY ("id_sgi")
);

-- CreateTable
CREATE TABLE "energia" (
    "id_sgi" SERIAL NOT NULL,
    "data_prevista" TIMESTAMP(3),
    "reprogramacao" TIMESTAMP(3),
    "atraso" INTEGER,
    "data_real_protocolo" TIMESTAMP(3),
    "sla_x" INTEGER,
    "num_protocolo" TEXT,
    "status_operacional" TEXT,
    "data_aprov_prevista" TIMESTAMP(3),
    "data_aprov_real" TIMESTAMP(3),
    "sla_y" INTEGER,
    "observacoes" TEXT,

    CONSTRAINT "energia_pkey" PRIMARY KEY ("id_sgi")
);

-- CreateTable
CREATE TABLE "rodovia" (
    "id_sgi" SERIAL NOT NULL,
    "data_prevista" TIMESTAMP(3),
    "reprogramacao" TIMESTAMP(3),
    "atraso" INTEGER,
    "data_real_protocolo" TIMESTAMP(3),
    "sla_x" INTEGER,
    "num_protocolo" TEXT,
    "status_operacional" TEXT,
    "data_aprov_prevista" TIMESTAMP(3),
    "data_aprov_real" TIMESTAMP(3),
    "sla_y" INTEGER,
    "observacoes" TEXT,

    CONSTRAINT "rodovia_pkey" PRIMARY KEY ("id_sgi")
);

-- CreateTable
CREATE TABLE "outra" (
    "id_sgi" SERIAL NOT NULL,
    "data_prevista" TIMESTAMP(3),
    "reprogramacao" TIMESTAMP(3),
    "atraso" INTEGER,
    "data_real_protocolo" TIMESTAMP(3),
    "sla_x" INTEGER,
    "num_protocolo" TEXT,
    "status_operacional" TEXT,
    "data_aprov_prevista" TIMESTAMP(3),
    "data_aprov_real" TIMESTAMP(3),
    "sla_y" INTEGER,
    "observacoes" TEXT,

    CONSTRAINT "outra_pkey" PRIMARY KEY ("id_sgi")
);

-- CreateTable
CREATE TABLE "observacoes" (
    "id_sgi" SERIAL NOT NULL,
    "observacoes_gerais" TEXT,

    CONSTRAINT "observacoes_pkey" PRIMARY KEY ("id_sgi")
);

-- CreateIndex
CREATE UNIQUE INDEX "gerencial_nome_projeto_key" ON "gerencial"("nome_projeto");
