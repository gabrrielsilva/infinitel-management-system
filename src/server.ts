import express from 'express';
import { errorHandler } from './middleware/error-handler';
import { executiveRouter } from './route/project-executive-routes';
import { projectRouter } from './route/project-routes';
import { spreadsheetRouter } from './route/project-spreadsheet-route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(executiveRouter);
app.use(spreadsheetRouter);
app.use(projectRouter);
app.use(errorHandler);

app.listen(3000, () => console.log('Server initialized'));
