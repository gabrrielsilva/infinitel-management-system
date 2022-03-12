import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import { router } from './route/project-routes';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);

app.listen(3000, () => console.log('Server initialized'));
