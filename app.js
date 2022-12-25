const express  = require("express");
const app = express();
const port = 3000;
const datas = require('./data.json');
const fs = require('fs');
const mariadb = require('mariadb');
const pool = require('./db/db');

app.use(express.json());

app.listen(port, () => {
    console.log('server sedang berjalan di port 3000')
});

app.get('/', (req, res) =>{
    return new Promise(async (resolve, reject) => {
        let conn = null;
        try {
            conn = await pool.getConnection();
            const data = await conn.query('SELECT * FROM user');
            res.json(data);
        } catch (error) {
            console.log(error);
        }finally{
            if (conn) return conn.end();
        }
    })
})

app.post('/', (req, res) => {
    return new Promise(async (resolve, reject) => {
        let conn = null;
        try {
            conn = await pool.getConnection();
            const body = req.body;
            const data = await conn.query('INSERT INTO user (name, age) VALUES (?, ?)', [body.name, body.age]);
            res.json("data berhasil ditambahkan");
        } catch (error) {
            console.log(error);
        }finally{
            if (conn) return conn.end();
        }
    });
});

app.put('/:id', (req, res) => {
    return new Promise(async (resolve, reject) => {
        let conn = null;
        try {
            const id = req.params.id;
            conn = await pool.getConnection();
            const body = req.body;
            await conn.query('UPDATE user SET name = ?, age = ? WHERE id_user = ?', [body.name, body.age, id]);
            res.json("data berhasil diubah");
        } catch (error) {
            console.log(error);
        }finally{
            if (conn) return conn.end();
        }
    })
});

app.delete('/:id', (req, res) => {
    return new Promise(async (resolve, reject) => {
        let conn = null;
        try {
            const id = req.params.id;
            conn = await pool.getConnection();
            await conn.query('DELETE FROM user WHERE id_user = ?', [id]);
            res.json("data berhasil dihapus");
        } catch (error) {
            console.log(error);
        }
    })
});

