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

            res.send(result.res);

        })
});

app.post('/listSedes', (req, res) => {

    getSedesList()
        .then((result) => {
            res.send(result);
        })
});

app.post('/listColaboradores', (req, res) => {

    getColaboradoresList()
        .then((result) => {
            res.send(result);
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

app.post('/createClient/:nombre/:apellido1/:apellido2/:sede/:membresia/:dni/:fechanac/:telefono/:usuario', (req, res) => {
    const nombre = req.params.nombre;
    const apellido1 = req.params.apellido1;
    const apellido2 = req.params.apellido2;
    const sede = req.params.sede;
    const membresia = req.params.membresia;
    const dni = req.params.fechanac;
    const fecha_nacimiento = req.params.fechanac;
    const telefono = req.params.telefono;
    const user = req.params.usuario;

    createClient(nombre, apellido1, apellido2, sede, membresia, dni, fecha_nacimiento, telefono, user)
        .then((result) => {
            res.send(result.res);
        })
});

app.post('/getClients', (req, res) => {
    const id = req.body.id || null;
    getClients(id).then((result) => {
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
    })
})

app.post('/registerColaborador', (req, res) => {

    registerColaborator(req.body)
        .then((result) => {
            res.send(result.res);
        })

})

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


app.post('/getClientsFiltered/:input', (req, res) => {
    const input = req.params.input;
    getClientsFiltered(input).then((result) => {
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
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.post('/listEjercicios', (req, res) => {

    getEjerciciosList()
        .then((result) => {
            res.send(result);
        })
});

app.post('/listGrupoMuscular', (req, res) => {

    getGrupoMuscularList()
        .then((result) => {
            res.send(result);
        })
});

app.post('/registerEjercicio', (req, res) => {

    registerEjercicio(req.body)
        .then((result) => {
            res.send(result.res);
        })

})


app.post('/asignTrainer/:idUsuario/:idEntrenador', (req, res) => {
    const idUsuario = req.params.idUsuario;
    const idEntrenador = req.params.idEntrenador;
    asignarEntrenador(idUsuario, idEntrenador).then((result) => {
        res.send(result);
    }).catch((error) => {
        console.error("Error al asignar entrenador:", error);
    })
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
    const result = await client.query(`SELECT id_membresia, nombre, detalle_membresia, estado FROM MEMBRESIA WHERE estado = 'A';`);
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
    const result = await client.query(`SELECT id_membresia, nombre, detalle_membresia, estado FROM MEMBRESIA WHERE estado = 'I';`);
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


const getClients = async (id) => {
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

   
    var result;
    if(id != undefined){
        const idUsuarioResult = await client.query(`SELECT A.id_persona FROM PERSONA a WHERE a.numero_documento_identidad = '${id}'`);
        const idUsuario = idUsuarioResult.rows[0].id_persona;
        result = await client.query(`SELECT A.id_persona, A.nombre_1, A.apellido_1, A.apellido_2, EXTRACT(YEAR FROM AGE(a.fecha_nacimiento)) AS edad, a.fecha_nacimiento, a.telefono, d.nombre_sede, e.nombre as membresia, b.fecha_fin, a.numero_documento_identidad as dni,
        TO_CHAR( f.fecha_modificacion , 'DD/MM/YYYY') as modificacion_plan,
        TO_CHAR( g.fecha_modificacion , 'DD/MM/YYYY') as modificacion_metricas,
        h.nombre_1 || ' ' || h.apellido_1 as entrenador FROM persona a INNER JOIN CONTRATO b ON a.ID_PERSONA = b.ID_PERSONA INNER JOIN TIPO_PERSONA c ON b.ID_TIPO_PERSONA = c.ID_TIPO_PERSONA INNER JOIN SEDE d ON b.ID_SEDE = d.ID_SEDE INNER JOIN MEMBRESIA e ON b.ID_MEMBRESIA = e.ID_MEMBRESIA LEFT JOIN PLAN_ENTRENAMIENTO f ON a.ID_PERSONA = f.ID_PERSONA
        LEFT JOIN PROGRESO g ON a.ID_PERSONA = g.ID_PERSONA
        LEFT JOIN PERSONA h ON a.ID_ENTRENADOR = h.ID_PERSONA
        WHERE c.TIPO_PERSONA = 'C' AND a.ESTADO = 'A' AND (a.ID_ENTRENADOR is NULL OR a.ID_ENTRENADOR = ${idUsuario});`);
    }
    else{
        result = await client.query(`SELECT A.id_persona, A.nombre_1, A.apellido_1, A.apellido_2, EXTRACT(YEAR FROM AGE(a.fecha_nacimiento)) AS edad, a.fecha_nacimiento, a.telefono, d.nombre_sede, e.nombre as membresia, b.fecha_fin, a.numero_documento_identidad as dni,
        TO_CHAR( f.fecha_modificacion , 'DD/MM/YYYY') as modificacion_plan,
        TO_CHAR( g.fecha_modificacion , 'DD/MM/YYYY') as modificacion_metricas, 
        h.nombre_1 || ' ' || h.apellido_1 as entrenador
        FROM persona a
        INNER JOIN CONTRATO b ON a.ID_PERSONA = b.ID_PERSONA INNER JOIN TIPO_PERSONA c ON b.ID_TIPO_PERSONA = c.ID_TIPO_PERSONA INNER JOIN SEDE d ON b.ID_SEDE = d.ID_SEDE INNER JOIN MEMBRESIA e ON b.ID_MEMBRESIA = e.ID_MEMBRESIA LEFT JOIN PLAN_ENTRENAMIENTO f ON a.ID_PERSONA = f.ID_PERSONA
        LEFT JOIN PROGRESO g ON a.ID_PERSONA = g.ID_PERSONA
        LEFT JOIN PERSONA h ON a.ID_ENTRENADOR = h.ID_PERSONA
        WHERE c.TIPO_PERSONA = 'C' AND a.ESTADO = 'A'`);
    }
    
    
    const clientes = result.rows.map(row => ({
        Id: row.id_persona,
        nombre: row.nombre_1,
        apellido1: row.apellido_1,
        apellido2: row.apellido_2,
        edad: row.edad,
        telefono: row.telefono,
        sede: row.nombre_sede,
        membresia: row.membresia,
        fechafin: row.fecha_fin,
        dni: row.dni,
        modificacion_metricas: row.modificacion_metricas,
        modificacion_plan: row.modificacion_plan,
        fecha_nacimiento: row.fecha_nacimiento,
        entrenador: row.entrenador

    }));
    await client.end();
    return clientes;
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

const registerColaborator = async (body) => {
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
    const result = await client.query(`
    SELECT public.registrar_colaborador(
        '${body.nombre_1}'::text,          
        '${body.nombre_2}'::text,          
        '${body.apellido_1}'::text,          
        '${body.apellido_2}'::text,          
        '${body.fecha_nacimiento}'::text,        
        '${body.correo}'::text, 
        '${body.sexo}'::text,                 
        '${body.telefono}'::text,         
        '${body.numero_documento_identidad}'::text,          
        '${body.id_tipo_persona}'::text,                
        '${body.idSede}'::text                  
    );
    `);
    const clientes = result.rows.map(row => ({

    }));
    await client.end();
    return clientes;
}

const getEjerciciosList = async () => {

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

    const res = await client.query(`
        SELECT e.id_ejercicio, e.id_grupo_muscular, gm.nombre_grupo_muscular, e.nombre, e.imagen
            FROM ejercicios e
            INNER JOIN grupo_muscular gm on e.id_grupo_muscular = gm.id_grupo_muscular
        WHERE e.estado = 'A'
    `);

    const ejercicios = res.rows.map(row => ({
        id_ejercicio: row.id_ejercicio,
        id_grupo_muscular: row.id_grupo_muscular,
        nombre_grupo_muscular: row.nombre_grupo_muscular,
        nombre: row.nombre,
        imagen: row.imagen,
    }));

    await client.end();

    return ejercicios;
}

const getGrupoMuscularList = async () => {

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

    const res = await client.query(`
        select id_grupo_muscular, nombre_grupo_muscular, fecha_creacion from grupo_muscular
        where estado = 'A'
    `);

    const grupoMuscular = res.rows.map(row => ({
        id_grupo_muscular: row.id_grupo_muscular,
        nombre_grupo_muscular: row.nombre_grupo_muscular,
        fecha_creacion: row.fecha_creacion,
    }));

    await client.end();

    return grupoMuscular;
}

const registerEjercicio = async (body) => {

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

    const result = await client.query(`
        INSERT INTO public.ejercicios(
        id_grupo_muscular, nombre, imagen, fecha_creacion, fecha_modificacion, estado, usuario_modificacion)
        VALUES (${body.id_grupo_muscular}, '${body.nombre}', '${body.imagen}', CURRENT_DATE, CURRENT_DATE, 'A', 1);
    `);
    const clientes = result.rows.map(row => ({

    }));
    await client.end();
    return clientes;
}

const asignarEntrenador = async(usuario, entrenador) => {
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

    const idEntrenadorResult = await client.query(`SELECT A.id_persona FROM PERSONA a WHERE a.numero_documento_identidad = '${entrenador}'`);
    const idEntrenador = idEntrenadorResult.rows[0].id_persona;
    const result = await client.query(`UPDATE PERSONA SET ID_ENTRENADOR = ${idEntrenador} WHERE ID_PERSONA = ${usuario}`);
    await client.end();
    return result;
}