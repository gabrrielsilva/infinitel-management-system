import { Comments } from './Comments';
import { Energy } from './Energy';
import { Executive } from './Executive';
import { Highway } from './Highway';
import { Other } from './Other';
import { Prefecture } from './Prefecture';

export interface Project {
  id_sgi: number;
  nome_projeto: string;
  tipo_projeto: string;
  estado: string;
  cidade: string;
  status_sgi: string;
  executivo: Executive | undefined;
  prefeitura: Prefecture | undefined;
  energia: Energy | undefined;
  rodovia: Highway | undefined;
  outra: Other | undefined;
  observacoes: Comments | undefined;
}
