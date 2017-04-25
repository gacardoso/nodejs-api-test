import express from 'express';

const app = express();

app.route('/books')
    .get((req, res) => {
        res.json([{
            id: 1,
            name: 'Default Book'
        }])
    })

//se não passar ele import esse como padão 
export default app;