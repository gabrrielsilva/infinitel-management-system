import express from 'express';
import { errorHandler } from './middleware/error-handler';
import { commentRouter } from './route/project-comments-routes';
import { energyRouter } from './route/project-energy-routes';
import { executiveRouter } from './route/project-executive-routes';
import { highwayRouter } from './route/project-highway-routes';
import { prefectureRouter } from './route/project-prefecture-routes';
import { railwayRouter } from './route/project-railway-routes';
import { projectRouter } from './route/project-routes';
import { spreadsheetRouter } from './route/project-spreadsheet-route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(commentRouter);
app.use(railwayRouter);
app.use(highwayRouter);
app.use(energyRouter);
app.use(prefectureRouter);
app.use(executiveRouter);
app.use(spreadsheetRouter);
app.use(projectRouter);
app.use(errorHandler);

app.listen(3000, () => console.log('Server initialized'));
