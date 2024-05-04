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

app.post('/reset/:user/:password', (req, res) => {

    const user = req.params.user;
    const password = req.params.password;

    resetPassword(user, password)
        .then((result) => {

            console.log(result.res);
            res.send(result.res);

        })
});

app.post('/registerSede/:dni', (req, res) => {

    registerSede(req.body, req.params.dni)
        .then((result) => {

            console.log(result.res);
            res.send(result.res);

        })
});

app.post('/listSedes', (req, res) => {

    getSedesList()
        .then((result) => {
            console.log("Sedes obtenidas:", result);
            res.send(result);
        })
});

app.post('/listColaboradores', (req, res) => {

    getColaboradoresList()
        .then((result) => {
            console.log("Colaboradores obtenidos:", result);
            res.send(result);
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

const resetPassword = async (user, password) => {

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

    const res = await client.query(`UPDATE contrato SET "contraseña" = '${password}' WHERE id_persona = (select p.id_persona FROM persona p
        INNER JOIN contrato c on p.id_persona = c.id_persona
        where p.numero_documento_identidad = '${user}') RETURNING true as res`);

    const result = res.rows[0];

    await client.end();

    return result;
}

const registerSede = async (sede, dni) => {

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

    const res = await client.query(`INSERT INTO public.sede(
        nombre_sede, abreviacion, direccion, fecha_creacion, fecha_modificacion, estado, usuario_modificacion)
        VALUES ('${sede.nombreSede}', '${sede.abreviacion}', '${sede.direccion}', CURRENT_DATE, CURRENT_DATE, 'A', ${dni}) RETURNING true as res;`);

    const result = res.rows[0];

    await client.end();

    console.log("result = ", result)

    return result;
}

const getSedesList = async () => {

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

    const res = await client.query(`select * from sede`);

    const sedes = res.rows.map(row => ({
        idSede: row.id_sede,
        nombreSede: row.nombre_sede,
        abreviacion: row.abreviacion,
        direccion: row.direccion,
        fechaCreacion: row.fecha_creacion,
        fechaModificacion: row.fecha_modificacion,
        estado: row.estado,
        usuarioModificacion: row.usuario_modificacion
    }));

    await client.end();

    return sedes;
}

const getColaboradoresList = async () => {

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

    const res = await client.query(`select p.id_persona, p.nombre_1, p.nombre_2, p.apellido_1, p.apellido_2, p.fecha_nacimiento, p.correo, p.sexo, p.telefono,
            p.numero_documento_identidad, p.fecha_creacion, c.id_tipo_persona, tp.detalle_tipo, c.fecha_inicio
            from persona p
        inner join contrato c on p.id_persona = c.id_persona
        inner join tipo_persona tp on tp.id_tipo_persona = c.id_tipo_persona
        where tp.detalle_tipo in ('Entrenador','Recepcionista')
        `);

    const colaboradores = res.rows.map(row => ({
        id_persona: row.id_persona,
        nombre_1: row.nombre_1,
        nombre_2: row.nombre_2,
        apellido_1: row.apellido_1,
        apellido_2: row.apellido_2,
        fecha_nacimiento: row.fecha_nacimiento,
        correo: row.correo,
        sexo: row.sexo,
        telefono: row.telefono,
        numero_documento_identidad: row.numero_documento_identidad,
        fecha_creacion: row.fecha_creacion,
        id_tipo_persona: row.id_tipo_persona,
        detalle_tipo: row.detalle_tipo,
        fecha_inicio: row.fecha_inicio,

    }));

    await client.end();

    return colaboradores;
}