const express = require('express');
const cors = require('cors');
const { Client } = require("pg");

const app = express()
const port = 3001

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/login/:user/:password', (req, res) => {

    const user = req.params.user;
    const password = req.params.password;

    login(user, password)
        .then((result) => {
            console.log(JSON.stringify(result.obtener_usuario2));
            res.json(JSON.stringify(result.obtener_usuario2));
        })



});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


//-----------------------------Funciones----------------------------

const login = async (user, password) => {

    const client = new Client({
        user: "omodygym_user",
        host: "dpg-cocr9amv3ddc739ki7b0-a.oregon-postgres.render.com",
        database: "omodygym",
        password: "9sAnVEwzwYzR1GMdsET5UQo7XzYjcrup",
        port: 5432,
        ssl: {
            rejectUnauthorizedL: false,
        }
    });

    await client.connect();

    const res = await client.query(`SELECT public.obtener_usuario2('${user}', '${password}')`);

    const result = res.rows[0];

    await client.end();

    return result;

}