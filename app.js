import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './routes/books';

const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 3000);
app.use(bodyParser.json());
const Books = app.datasource.models.Books;
booksRouter(app, Books);

// se não passar ele import esse como padão "default"
export default app;
