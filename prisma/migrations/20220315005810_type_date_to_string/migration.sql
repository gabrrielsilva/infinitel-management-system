-- AlterTable
ALTER TABLE "energia" ALTER COLUMN "data_prevista" SET DATA TYPE TEXT,
ALTER COLUMN "reprogramacao" SET DATA TYPE TEXT,
ALTER COLUMN "data_real_protocolo" SET DATA TYPE TEXT,
ALTER COLUMN "data_aprov_prevista" SET DATA TYPE TEXT,
ALTER COLUMN "data_aprov_real" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "executivo" ALTER COLUMN "data_acionamento" SET DATA TYPE TEXT,
ALTER COLUMN "data_aceita_exec" SET DATA TYPE TEXT,
ALTER COLUMN "data_tim" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "outra" ALTER COLUMN "data_prevista" SET DATA TYPE TEXT,
ALTER COLUMN "reprogramacao" SET DATA TYPE TEXT,
ALTER COLUMN "data_real_protocolo" SET DATA TYPE TEXT,
ALTER COLUMN "data_aprov_prevista" SET DATA TYPE TEXT,
ALTER COLUMN "data_aprov_real" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "prefeitura" ALTER COLUMN "data_prevista" SET DATA TYPE TEXT,
ALTER COLUMN "reprogramacao" SET DATA TYPE TEXT,
ALTER COLUMN "data_real_protocolo" SET DATA TYPE TEXT,
ALTER COLUMN "data_aprov_prevista" SET DATA TYPE TEXT,
ALTER COLUMN "data_aprov_real" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "rodovia" ALTER COLUMN "data_prevista" SET DATA TYPE TEXT,
ALTER COLUMN "reprogramacao" SET DATA TYPE TEXT,
ALTER COLUMN "data_real_protocolo" SET DATA TYPE TEXT,
ALTER COLUMN "data_aprov_prevista" SET DATA TYPE TEXT,
ALTER COLUMN "data_aprov_real" SET DATA TYPE TEXT;
