import express from 'express';
import config from './config/config';
import datasource from './config/datasource';

const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);

app.route('/books')
    .get((req, res) => {
        res.json([{
            id: 1,
            name: 'Default Book'
        }])
    })

//se não passar ele import esse como padão "default"
export default app;