const express = require("express");
const os = require("os");
const mysql = require("mysql2");

const app = express();


const db = mysql.createConnection({
    host: 'localhost',      
    user: 'root',           
    password: '123546',     
    database: 'projeto1',   
    port: 3010             
});


db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MariaDB.');
});

app.get("/", (request, response) => {
    return response
        .status(200)
        .json({
            message: "Olá"
        });
});

app.get("/liveness", (request, response) => {
    return response
        .status(200)
        .json({
            message: "Meu app está vivo",
            path: process.cwd(),
            gid: process.getegid(),
            uid: process.geteuid()
        });
});

app.get("/readiness", (request, response) => {
    return response
        .status(200)
        .json({
            message: "Meu app está pronto!",
            plataform: os.platform(),
            freemem: os.freemem(),
            homedir: os.homedir()
        });
});

app.get("/consulta-dados", (request, response) => {
    const sql = 'SELECT * FROM times';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao consultar os dados:', err);
            return response.status(500).send('Erro ao consultar os dados.');
        }
        return response.status(200).json(results);
    });
});

module.exports = app;
