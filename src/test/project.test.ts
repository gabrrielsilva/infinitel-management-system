import axios, { Method } from 'axios';
import crypto from 'crypto';
import { client } from '../../db/client';
import { Project } from '../model/Project';
import { projectService } from '../service/project-service';

const generate = () => {
  return crypto.randomBytes(8).toString('hex');
};

const request = (url: string, method: Method, data?: any) => {
  return axios({ url, method, data });
};

enum id {
  a,
  b,
}

beforeAll(() => {
  client.gerencial.deleteMany();
});

it('should get projects', async () => {
  await projectService.saveProject({
    id_sgi: id.a,
    nome_projeto: generate(),
    tipo_projeto: generate(),
    estado: generate(),
    cidade: generate(),
    status_sgi: generate(),
  });
  await projectService.saveProject({
    id_sgi: id.b,
    nome_projeto: generate(),
    tipo_projeto: generate(),
    estado: generate(),
    cidade: generate(),
    status_sgi: generate(),
  });

  const response = await request('http://localhost:3000/projects', 'GET');
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
  });
  await projectService.saveProject({
    id_sgi: id.b,
    nome_projeto: generate(),
    tipo_projeto: generate(),
    estado: generate(),
    cidade: generate(),
    status_sgi: generate(),
  });

  const response = await request(
    `http://localhost:3000/projects/${id.a}`,
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
  };
  const response = await request('http://localhost:3000/project', 'POST', data);
  expect(response.status).toBe(201);
  const project = JSON.parse(response.config.data);

  expect(project.id_sgi).toBe(data.id_sgi);
  expect(project.nome_projeto).toBe(data.nome_projeto);
  expect(project.tipo_projeto).toBe(data.tipo_projeto);
  expect(project.estado).toBe(data.estado);
  expect(project.cidade).toBe(data.cidade);
  expect(project.status_sgi).toBe(data.status_sgi);

  await projectService.deleteProject(id.a);
});

// it('should save project sheets');
// it('should not save a project');
// it('should update a project');
// it('should not update a project');
// it('should delete project');
