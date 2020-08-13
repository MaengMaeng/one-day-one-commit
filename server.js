const express = require('express');
const next = require('next');
const axios = require('axios');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
    const server = express();

    server.use(express.json());

    server.post('/auth', async(req, res) => {
        const { code } = req.body;
        const client_id = '88646c7a2d563129879e';
        const client_secret = '7ffbc97d4dc349de50a7873bd1ab74ff5d026275';

        const response = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                code,
                client_id,
                client_secret,
            },
            {
                headers: {
                   accept: 'application/json',
                },
            },
        );
    
        const token = response.data.access_token;
        
        const { data } = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${token}`,
            },
        });
    
        return res.status(200).json({ data });
    })

    server.get('*', (req, res) => {
        return handle(req, res);
    })


    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Reday on http://localhost:3000');
    })
})
.catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
})