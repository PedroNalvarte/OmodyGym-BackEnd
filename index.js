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
    const dni = req.params.dni;
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

app.get('/getLastPlan', async (req, res) => {
    try {
        const ultimoPlan = await getLastPlan();
        res.send(ultimoPlan.toString());
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el último plan');
    }
})

app.post('/insertTrainingPlan', (req, res) => {
    try {
        registerTrainingPlan(req.body)
            .then((result) => {
                res.send(result.res);
            })

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al insertar plan');
    }
})

app.post('/listMiPlan/:dni', (req, res) => {

    const dni = req.params.dni;

    getMiPlanList(dni)
        .then((result) => {
            res.send(result);
        })
});

app.post('/getProfileData/:dni', (req, res) => {

    const dni = req.params.dni;

    getProfileData(dni)
        .then((result) => {
            res.send(result);
        })
});


app.post('/getClientMetrics/:client', (req, res) => {
    const client = req.params.client;

    getClientMetrics(client)
        .then((result) => {
            res.send(result);
        })
})

app.post('/insertMetric', (req, res) => {
    try {
        registerMetrics(req.body)
            .then((result) => {
                res.send(result.res);
            })

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar métricas');
    }
})

app.post('/updateSiteStatus/:id', (req, res) => {
    const idS = req.params.id;
    updateSiteStatus(idS).then((result) => {
        res.send(result);
    }).catch((error) => {
        console.error("Error al obtener las sedes:", error);
    })
})

app.post('/listMyMetrics/:dni', (req, res) => {

    const dni = req.params.dni;

    listMyMetrics(dni)
        .then((result) => {
            res.send(result);
        })
});

app.post('/verifyAccess/:dni', (req, res) => {

    const dni = req.params.dni;

    verifyAccess(dni)
        .then((result) => {
            res.send(result);
        })
});

app.post('/deleteLastPlan/:id', (req, res) => {
    const id = req.params.id;
    deleteLastPlan(id)
        .then((result) => {
            res.send(result);
        })
})

app.post('/updateAccess/:idMembresia/:idSede/:fecha/:usuario',(req, res) => {
    const membresia = req.params.idMembresia;
    const sede = req.params.idSede;
    const fecha = req.params.fecha;
    const usuario = req.params.usuario;
    updateAccess(membresia, sede, fecha, usuario)
        .then((result) => {res.send(result)});
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
    if (id != undefined) {
        const idUsuarioResult = await client.query(`SELECT A.id_persona FROM PERSONA a WHERE a.numero_documento_identidad = '${id}'`);
        const idUsuario = idUsuarioResult.rows[0].id_persona;
        result = await client.query(`SELECT 
        A.id_persona, 
        A.nombre_1, 
        A.apellido_1, 
        A.apellido_2, 
        EXTRACT(YEAR FROM AGE(a.fecha_nacimiento)) AS edad, 
        a.fecha_nacimiento, 
        a.telefono, 
        d.nombre_sede, 
        e.nombre AS membresia, 
        b.fecha_fin, 
        a.numero_documento_identidad AS dni,
        TO_CHAR(f.fecha_modificacion, 'DD/MM/YYYY') AS modificacion_plan,
        TO_CHAR(g.fecha_modificacion, 'DD/MM/YYYY') AS modificacion_metricas, 
        h.nombre_1 || ' ' || h.apellido_1 AS entrenador,
        h.id_persona AS id_entrenador,
        b.id_sede,
        b.fecha_creacion
    FROM 
        persona a
    INNER JOIN 
        contrato b ON a.id_persona = b.id_persona 
    INNER JOIN 
        tipo_persona c ON b.id_tipo_persona = c.id_tipo_persona 
    INNER JOIN 
        sede d ON b.id_sede = d.id_sede 
    INNER JOIN 
        membresia e ON b.id_membresia = e.id_membresia 
    LEFT JOIN (
        SELECT 
            p.id_persona, 
            MAX(p.fecha_modificacion) AS fecha_modificacion
        FROM 
            plan_entrenamiento p
        GROUP BY 
            p.id_persona
    ) f ON a.id_persona = f.id_persona
    LEFT JOIN (
        SELECT 
            pr.id_persona, 
            MAX(pr.fecha_modificacion) AS fecha_modificacion
        FROM 
            progreso pr
        GROUP BY 
            pr.id_persona
    ) g ON a.id_persona = g.id_persona
    LEFT JOIN 
        persona h ON a.id_entrenador = h.id_persona
    WHERE 
        c.tipo_persona = 'C' 
        AND a.estado = 'A'
     AND (a.ID_ENTRENADOR is NULL OR a.ID_ENTRENADOR = ${idUsuario});`);
    }
    else {
        result = await client.query(`SELECT 
        A.id_persona, 
        A.nombre_1, 
        A.apellido_1, 
        A.apellido_2, 
        EXTRACT(YEAR FROM AGE(a.fecha_nacimiento)) AS edad, 
        a.fecha_nacimiento, 
        a.telefono, 
        d.nombre_sede, 
        e.nombre AS membresia, 
        b.fecha_fin, 
        a.numero_documento_identidad AS dni,
        TO_CHAR(f.fecha_modificacion, 'DD/MM/YYYY') AS modificacion_plan,
        TO_CHAR(g.fecha_modificacion, 'DD/MM/YYYY') AS modificacion_metricas, 
        h.nombre_1 || ' ' || h.apellido_1 AS entrenador,
        h.id_persona AS id_entrenador,
        b.id_sede,
        b.fecha_creacion
    FROM 
        persona a
    INNER JOIN 
        contrato b ON a.id_persona = b.id_persona 
    INNER JOIN 
        tipo_persona c ON b.id_tipo_persona = c.id_tipo_persona 
    INNER JOIN 
        sede d ON b.id_sede = d.id_sede 
    INNER JOIN 
        membresia e ON b.id_membresia = e.id_membresia 
    LEFT JOIN (
        SELECT 
            p.id_persona, 
            MAX(p.fecha_modificacion) AS fecha_modificacion
        FROM 
            plan_entrenamiento p
        GROUP BY 
            p.id_persona
    ) f ON a.id_persona = f.id_persona
    LEFT JOIN (
        SELECT 
            pr.id_persona, 
            MAX(pr.fecha_modificacion) AS fecha_modificacion
        FROM 
            progreso pr
        GROUP BY 
            pr.id_persona
    ) g ON a.id_persona = g.id_persona
    LEFT JOIN 
        persona h ON a.id_entrenador = h.id_persona
    WHERE 
        c.tipo_persona = 'C' 
        AND a.estado = 'A';
    `);
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
        entrenador: row.entrenador,
        idEntrenador: row.id_entrenador,
        idSede:row.id_sede,
        fechaCreacion: row.fecha_creacion

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

const registerTrainingPlan = async (body) => {

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
    INSERT INTO public.plan_entrenamiento(ID_PERSONA, ID_EJERCICIO, SERIES, REPETICIONES, DIA, FECHA_CREACION, ID_PLAN_ENTRENAMIENTO, FECHA_MODIFICACION, ESTADO, USUARIO_MODIFICACION, ID_ENTRENADOR)
    VALUES (${body.idUsuario}, ${body.idEjercicio}, ${body.series}, ${body.repeticiones}, ${body.dia}, CURRENT_DATE, ${body.idPlanEntrenamiento}, CURRENT_DATE, 'A', ${body.idEntrenador}, ${body.idEntrenador});
    `);
    const clientes = result.rows.map(row => ({

    }));
    await client.end();
    return clientes;
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
            p.numero_documento_identidad, p.fecha_creacion, c.id_tipo_persona, tp.detalle_tipo, c.fecha_inicio, c.id_sede
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
        idSede: row.id_sede
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

const asignarEntrenador = async (usuario, entrenador) => {
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

const getLastPlan = async () => {
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
    const result = await client.query(`SELECT MAX(id_plan_entrenamiento) AS ultimo_plan_entrenamiento
    FROM plan_entrenamiento;`);
    await client.end();

    const ultimo_plan = result.rows[0].ultimo_plan_entrenamiento
    return ultimo_plan + 1;
}

const getMiPlanList = async (dni) => {

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
        select pe.id_persona, pe.id_plan_entrenamiento, pe.dia, gm.id_grupo_muscular, gm.nombre_grupo_muscular, pe.id_ejercicio,
        e.nombre, e.imagen, pe.series, pe.repeticiones 
        
        from plan_entrenamiento pe

        inner join ejercicios e on e.id_ejercicio = pe.id_ejercicio
        inner join grupo_muscular gm on gm.id_grupo_muscular = e.id_grupo_muscular
        
        where pe.id_persona = (select id_persona from persona where numero_documento_identidad = '${dni}')
        and pe.estado = 'A'
        order by pe.dia asc
    `);

    const miPlan = res.rows.map(row => ({
        id_persona: row.id_persona,
        id_plan_entrenamiento: row.id_plan_entrenamiento,
        dia: row.dia,
        id_grupo_muscular: row.id_grupo_muscular,
        nombre_grupo_muscular: row.nombre_grupo_muscular,
        id_ejercicio: row.id_ejercicio,
        nombre: row.nombre,
        imagen: row.imagen,
        series: row.series,
        repeticiones: row.repeticiones,
    }));

    await client.end();

    return miPlan;
}

const createClient = async (nombre, apellido1, apellido2, sede, membresia, dni, fecha_nacimiento, telefono, usuario) => {
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
    const res = await client.query(`SELECT public.registrar_cliente('${nombre}', '${apellido1}', '${apellido2}', '${sede}', '${membresia}', '${dni}', '${fecha_nacimiento}', '${telefono}', '${usuario}')`);
    const result = res.rows[0];

    await client.end();

    return result;

}

const getProfileData = async (dni) => {

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
        select pe.id_persona, pe.nombre_1, pe.nombre_2, pe.apellido_1, pe.apellido_2, pe.fecha_nacimiento, pe.correo,
            tp.detalle_tipo, s.nombre_sede
            from persona pe
            inner join contrato c on c.id_persona = pe.id_persona
            inner join tipo_persona tp on tp.id_tipo_persona = c.id_tipo_persona
            inner join sede s on s.id_sede = c.id_sede
            where pe.id_persona = (select id_persona from persona pp where pp.numero_documento_identidad = '${dni}')
    `);



    const miPerfil = res.rows.map(row => ({
        id_persona: row.id_persona,
        nombre_1: row.nombre_1,
        nombre_2: row.nombre_2,
        apellido_1: row.apellido_1,
        apellido_2: row.apellido_2,
        fecha_nacimiento: row.fecha_nacimiento,
        correo: row.correo,
        detalle_tipo: row.detalle_tipo,
        nombre_sede: row.nombre_sede,
    }));

    await client.end();

    return miPerfil;
}

const getClientMetrics = async (cliente) => {
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

    const res = await client.query(`SELECT id_persona, peso, altura, edad, objetivo, consecutivo, grasa, imc, meta, bicep_izquierdo, bicep_derecho, cadera, cintura, muslo_derecho, muslo_izquierdo, TO_CHAR(COALESCE(fecha_modificacion, fecha_creacion), 'YYYY-MM-DD') AS fecha,  TO_CHAR(COALESCE(fecha_modificacion, fecha_creacion), 'DD') AS dia, TO_CHAR(COALESCE(fecha_modificacion, fecha_creacion), 'Month') as mes, TO_CHAR(COALESCE(fecha_modificacion, fecha_creacion), 'MM') AS mes_numero, estado, usuario_modificacion
    FROM PROGRESO
    WHERE id_persona = ${cliente} ORDER BY consecutivo desc`);

    const clientMetrics = res.rows.map(row => ({
        id_persona: row.id_persona,
        peso: row.peso,
        altura: row.altura,
        edad: row.edad,
        objetivo: row.objetivo,
        consecutivo: row.consecutivo,
        grasa: row.grasa,
        imc: row.imc,
        bicep_izquierdo: row.bicep_izquierdo,
        bicep_derecho: row.bicep_derecho,
        cadera: row.cadera,
        cintura: row.cintura,
        muslo_izquierdo: row.muslo_izquierdo,
        muslo_derecho: row.muslo_derecho,
        fecha: row.fecha,
        dia: row.dia,
        mes: row.mes,
        mes_numero: row.mes_numero,
        estado: row.estado,
        meta: row.meta
    }));

    await client.end();

    return clientMetrics;

}

const registerMetrics = async (body) => {

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

    const result = await client.query(`INSERT INTO public.progreso 
    (id_persona, peso, altura, edad, objetivo, consecutivo, grasa, imc, fecha_creacion, fecha_modificacion, estado, usuario_modificacion, meta, bicep_izquierdo, bicep_derecho, cadera, cintura, muslo_derecho, muslo_izquierdo)
    VALUES (${body.id_persona}, ${body.peso}, ${body.altura}, ${body.edad}, ${body.objetivo}, ${body.consecutivo}, ${body.grasa}, ${body.imc}, CURRENT_DATE, CURRENT_DATE, 'A', ${body.usuario_modificacion}, '${body.meta}', ${body.bicep_izquierdo}, ${body.bicep_derecho}, ${body.cadera}, ${body.cintura}, ${body.muslo_derecho}, ${body.muslo_izquierdo});`);

    await client.end();

    const clientes = result.rows.map(row => ({

    }));
    await client.end();
    return clientes;
}

const updateSiteStatus = async (id) => {
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
    var estadoActualResult = await client.query(`SELECT ESTADO FROM SEDE WHERE ID_SEDE = ${id}`);
    var estadoActual = estadoActualResult.rows[0].estado;
    var res = undefined;
    if (estadoActual === 'A') {
        res = await client.query(`UPDATE SEDE SET ESTADO = 'I' WHERE ID_SEDE = ${id}`);
    }
    else {
        res = await client.query(`UPDATE SEDE SET ESTADO = 'A' WHERE ID_SEDE = ${id}`);
    }

    const result = res.rows[0];
    await client.end();
    return result;

}

const listMyMetrics = async (dni) => {

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
        SELECT * 
        FROM progreso pro
        WHERE pro.id_persona = (
            SELECT id_persona 
            FROM persona 
            WHERE numero_documento_identidad = '${dni}'
        ) 
        AND pro.consecutivo = (
            SELECT MAX(consecutivo) 
            FROM progreso 
            WHERE id_persona = (
                SELECT id_persona 
                FROM persona 
                WHERE numero_documento_identidad = '${dni}'
            )
        );
    `);

    const myMetrics = res.rows.map(row => ({

        id_persona: row.id_persona,
        peso: row.peso,
        altura: row.altura,
        edad: row.edad,
        objetivo: row.objetivo,
        consecutivo: row.consecutivo,
        grasa: row.grasa,
        imc: row.imc,
        fecha_creacion: row.fecha_creacion,
        fecha_modificacion: row.fecha_modificacion,
        estado: row.estado,
        usuario_modificacion: row.usuario_modificacion,
        meta: row.meta,
        bicep_izquierdo: row.bicep_izquierdo,
        bicep_derecho: row.bicep_derecho,
        bicep_izquierdo: row.bicep_izquierdo,
        cadera: row.cadera,
        cintura: row.cintura,
        muslo_derecho: row.muslo_derecho,
        muslo_izquierdo: row.muslo_izquierdo,
    }));

    await client.end();

    return myMetrics;
}

const verifyAccess = async (dni) => {

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
        select p.id_persona, p.numero_documento_identidad, concat(p.nombre_1, ' ', p.apellido_1) as nombre_cliente
            , m.nombre as nombre_membresia, t.fin_membresia as estado_membresia, s.nombre_sede, pa.consecutivo, pa.inicio_periodo, pa.fin_periodo, pa.dia_cobro
            , pa.dia_pago, estado_pago
        from persona p
            inner join contrato t on t.id_persona = p.id_persona
            inner join membresia m on m.id_membresia = t.id_membresia
            inner join sede s on s.id_sede = t.id_sede
            inner join pagos pa on p.id_persona = pa.id_persona
            where p.numero_documento_identidad = '${dni}'
    `);

    const miPlan = res.rows.map(row => ({
        id_persona: row.id_persona,
        numero_documento_identidad: row.numero_documento_identidad,
        nombre_cliente: row.nombre_cliente,
        nombre_membresia: row.nombre_membresia,
        estado_membresia: row.estado_membresia,
        nombre_sede: row.nombre_sede,
        inicio_periodo: row.inicio_periodo,
        fin_periodo: row.fin_periodo,
        dia_cobro: row.dia_cobro,
        dia_pago: row.dia_pago,
        estado_pago: row.estado_pago,
    }));

    await client.end();

    return miPlan;
}

const deleteLastPlan = async (id) => {

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

    const res =  await client.query(`UPDATE PLAN_ENTRENAMIENTO SET ESTADO = 'I' WHERE ID_PERSONA = '${id}' AND ESTADO = 'A';`);
    await client.end();

    return res;

}

const updateAccess = async (membresia, sede, fecha, id) => {
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
    const res =  await client.query(`UPDATE CONTRATO SET id_membresia = ${membresia}, id_sede = ${sede}, fin_membresia = (DATE '${fecha}') WHERE ID_PERSONA = '${id}';`);
    await client.end();

    return res;
}