import axios, { Method } from 'axios';
import crypto from 'crypto';
import { client } from '../../db/client';
import { Project } from '../model/Project';
import { projectService } from '../service/project-service';

const generate = () => {
  return crypto.randomBytes(8).toString('hex');
};

const request = (url: string, method: Method, data?: any) => {
  return axios({
    url,
    method,
    data,
    validateStatus: null,
  });
};

enum id {
  a,
  b,
}

beforeAll(() => {
  client.projeto.deleteMany();
});

it('should get projects', async () => {
  await projectService.saveProject({
    id_sgi: id.a,
    nome_projeto: generate(),
    tipo_projeto: generate(),
    estado: generate(),
    cidade: generate(),
    status_sgi: generate(),
    executivo: undefined,
    prefeitura: undefined,
    energia: undefined,
    rodovia: undefined,
    outra: undefined,
    observacoes: undefined,
  });
  await projectService.saveProject({
    id_sgi: id.b,
    nome_projeto: generate(),
    tipo_projeto: generate(),
    estado: generate(),
    cidade: generate(),
    status_sgi: generate(),
    executivo: undefined,
    prefeitura: undefined,
    energia: undefined,
    rodovia: undefined,
    outra: undefined,
    observacoes: undefined,
  });

  const response = await request('http://localhost:3000/projetos', 'GET');
  const projects = response.data;

  expect(response.status).toBe(200);
  expect(projects).toHaveLength(2);

  await projectService.deleteProject(id.a);
  await projectService.deleteProject(id.b);
});

it('should get a project', async () => {
  await projectService.saveProject({
    id_sgi: id.a,
    nome_projeto: generate(),
    tipo_projeto: generate(),
    estado: generate(),
    cidade: generate(),
    status_sgi: generate(),
    executivo: undefined,
    prefeitura: undefined,
    energia: undefined,
    rodovia: undefined,
    outra: undefined,
    observacoes: undefined,
  });
  await projectService.saveProject({
    id_sgi: id.b,
    nome_projeto: generate(),
    tipo_projeto: generate(),
    estado: generate(),
    cidade: generate(),
    status_sgi: generate(),
    executivo: undefined,
    prefeitura: undefined,
    energia: undefined,
    rodovia: undefined,
    outra: undefined,
    observacoes: undefined,
  });

  const response = await request(
    `http://localhost:3000/projetos/${id.a}`,
    'GET',
  );
  const project = response.data;
  expect(project.id_sgi).toBe(id.a);

  await projectService.deleteProject(id.a);
  await projectService.deleteProject(id.b);
});

it('should save a project', async () => {
  const data: Project = {
    id_sgi: id.a,
    nome_projeto: generate(),
    tipo_projeto: generate(),
    estado: generate(),
    cidade: generate(),
    status_sgi: generate(),
    executivo: undefined,
    prefeitura: undefined,
    energia: undefined,
    rodovia: undefined,
    outra: undefined,
    observacoes: undefined,
  };
  const response = await request(
    'http://localhost:3000/projetos',
    'POST',
    data,
  );
  expect(response.status).toBe(201);
  const project = JSON.parse(response.config.data);

  expect(project.id_sgi).toBe(data.id_sgi);
  expect(project.nome_projeto).toBe(data.nome_projeto);
  expect(project.tipo_projeto).toBe(data.tipo_projeto);
  expect(project.estado).toBe(data.estado);
  expect(project.cidade).toBe(data.cidade);
  expect(project.status_sgi).toBe(data.status_sgi);
  expect(project.executivo).toBe(data.executivo);
  expect(project.prefeitura).toBe(data.prefeitura);
  expect(project.energia).toBe(data.energia);
  expect(project.rodovia).toBe(data.rodovia);
  expect(project.outra).toBe(data.outra);
  expect(project.observacoes).toBe(data.observacoes);

  await projectService.deleteProject(id.a);
});

it('should not save a project', async () => {
  const data: Project = {
    id_sgi: id.a,
    nome_projeto: generate(),
    tipo_projeto: generate(),
    estado: generate(),
    cidade: generate(),
    status_sgi: generate(),
    executivo: undefined,
    prefeitura: undefined,
    energia: undefined,
    rodovia: undefined,
    outra: undefined,
    observacoes: undefined,
  };

  const response1 = await request(
    'http://localhost:3000/projetos',
    'POST',
    data,
  );

  const response2 = await request(
    'http://localhost:3000/projetos',
    'POST',
    data,
  );

  expect(response1.status).toBe(201);
  expect(response2.status).toBe(409);
  expect(response2.data).toBe('Projeto já existe');

  await projectService.deleteProject(id.a);
});

it('should update a project', async () => {
  await projectService.saveProject({
    id_sgi: id.a,
    nome_projeto: generate(),
    tipo_projeto: generate(),
    estado: generate(),
    cidade: generate(),
    status_sgi: generate(),
    executivo: undefined,
    prefeitura: undefined,
    energia: undefined,
    rodovia: undefined,
    outra: undefined,
    observacoes: undefined,
  });

  const response1 = await request(
    `http://localhost:3000/projetos/${id.a}`,
    'GET',
  );
  const project: Project = response1.data;

  project.nome_projeto = generate();
  project.tipo_projeto = generate();
  project.estado = generate();
  project.cidade = generate();
  project.status_sgi = generate();

  const response2 = await request(
    `http://localhost:3000/projetos/${id.a}`,
    'PUT',
    project,
  );
  expect(response2.status).toBe(204);

  const updatedProject = await projectService.getProject(project.id_sgi);
  expect(updatedProject?.nome_projeto).toBe(project.nome_projeto);
  expect(updatedProject?.tipo_projeto).toBe(project.tipo_projeto);
  expect(updatedProject?.estado).toBe(project.estado);
  expect(updatedProject?.cidade).toBe(project.cidade);
  expect(updatedProject?.status_sgi).toBe(project.status_sgi);

  await projectService.deleteProject(id.a);
});

it('should not update a project', async () => {
  const project = {
    id: 10,
  };

  const response = await request(
    `http://localhost:3000/projetos/${project.id}`,
    'PUT',
    project,
  );

  expect(response.status).toBe(404);
});

it('should delete a project', async () => {
  await projectService.saveProject({
    id_sgi: id.a,
    nome_projeto: generate(),
    tipo_projeto: generate(),
    estado: generate(),
    cidade: generate(),
    status_sgi: generate(),
    executivo: undefined,
    prefeitura: undefined,
    energia: undefined,
    rodovia: undefined,
    outra: undefined,
    observacoes: undefined,
  });

  const response = await request(
    `http://localhost:3000/projetos/${id.a}`,
    'DELETE',
  );
  expect(response.status).toBe(204);

  const projects = await projectService.getProjects();
  expect(projects).toHaveLength(0);
});
