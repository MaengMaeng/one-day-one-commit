require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const next = require('next');
const axios = require('axios');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

app.prepare()
.then(() => {
    const server = express();

    server.use(express.json());

    server.post('/auth', async(req, res) => {
        const { code } = req.body;
        const client_id = process.env.GITHUB_CLIENT_ID;
        const client_secret = process.env.GITHUB_CLIENT_SECRET;

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


    server.listen(3000, e => {
        if (e) throw e
        console.log('> Reday on http://localhost:3000');
    })
})
.catch(e => {
    console.error(e.stack);
    process.exit(1);
})