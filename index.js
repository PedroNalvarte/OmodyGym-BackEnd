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

app.post('/createMembership/:detalle/:costo/:nombre/:usuario', (req, res) => {
    const detail = req.params.detalle;
    const cost = req.params.costo;
    const name = req.params.nombre;
    const user = req.params.usuario;

    createMembership(detail, cost, name, user)
        .then((result) => {
            res.send(result.res);
        })
});
app.post('/getClients', (req, res) => {
    getClients().then((result) => {
        res.send(result);
    }).catch((error) => {
        console.error("Error al obtener las membresías:", error);
    });

  
    

});
app.post('/getMemberships', (req, res) => {
    getMemberships().then((result) => {
        res.send(result);
    }).catch((error) => {
        console.error("Error al obtener las membresías:", error);
    });

  
    

});

app.post('/getInactiveMemberships', (req, res) => {
    getInactiveMemberships().then((result) => {
        res.send(result);
    }).catch((error) => {
        console.error("Error al obtener las membresías:", error);
    });
});

app.post('/updateMembershipStatus/:id', (req, res) => {
    const idM = req.params.id;
    updateMembershipStatus(idM).then((result) => {
        res.send(result);
    }).catch((error) => {
        console.error("Error al obtener las membresías:", error);
    } )
})
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


const createMembership = async (detail, cost, name, user) => {
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
    const res = await client.query(`SELECT public.registrar_membresia('${detail}', '${cost}', '${name}', '${user}')`);
    const result = res.rows[0];

    await client.end();

    return result;

}

const getMemberships = async () => {
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
    const result = await  client.query(`SELECT id_membresia, nombre, detalle_membresia, estado FROM MEMBRESIA WHERE estado = 'A';`);
    const membresias = result.rows.map(row => ({
        Id: row.id_membresia,
        nombre: row.nombre,
        detalle: row.detalle_membresia,
        estado: row.estado
    }));
    await client.end();
    return membresias;
}

const getInactiveMemberships = async () => {
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
    const result = await  client.query(`SELECT id_membresia, nombre, detalle_membresia, estado FROM MEMBRESIA WHERE estado = 'I';`);
    const membresias = result.rows.map(row => ({
        Id: row.id_membresia,
        nombre: row.nombre,
        detalle: row.detalle_membresia,
        estado: row.estado
    }));
    await client.end();
    return membresias;
}

const updateMembershipStatus = async (id) => {
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
    const res = await client.query(`SELECT public.actualizar_estado_membresia('${id}')`);
    const result = res.rows[0];
    await client.end();
    return result;

}


const getClients = async () => {
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
    const result = await  client.query(`SELECT A.id_persona, A.nombre_1, A.apellido_1, A.apellido_2, EXTRACT(YEAR FROM AGE(fecha_nacimiento)) AS edad, a.telefono, d.nombre_sede, e.nombre as membresia  FROM persona a INNER JOIN CONTRATO b ON a.ID_PERSONA = b.ID_PERSONA INNER JOIN TIPO_PERSONA c ON b.ID_TIPO_PERSONA = c.ID_TIPO_PERSONA INNER JOIN SEDE d ON b.ID_SEDE = d.ID_SEDE INNER JOIN MEMBRESIA e ON b.ID_MEMBRESIA = e.ID_MEMBRESIA WHERE C.TIPO_PERSONA = 'C';`);
    const clientes = result.rows.map(row => ({
        Id: row.id_persona,
        nombre: row.nombre_1,
        apellido1: row.apellido_1,
        apellido2: row.apellido_2,
        edad: row.edad,
        telefono: row.telefono,
        sede: row.nombre_sede,
        membresia: row.membresia

    }));
    await client.end();
    return clientes;
}