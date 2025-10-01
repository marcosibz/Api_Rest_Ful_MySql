import express from "express";
import pool from './config/conexion.js';

const app = express();
const PORT = 3000;


app.get("/", async(req, res) => {
    res.send('Api_Rest_Ful_MySql');
});

app.get("/users", async( req, res) => {

    const sql = 'SELECT * FROM users';
    try {
        const connection = await pool.getConnection(); //activar conexion
        const [rows] = await connection.query(sql); //ejecutar sql
        connection.release(); //liberar conexion
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

app.get("/users/:id", async (req, res) => {
    const sql = 'SELECT * FROM users WHERE id_user = ?';
    const id = req.params.id;
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id]);
        connection.release();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

app.get("/users/:id/:name", async(req, res) => {
    res.json({ message: `Detalle del usuario con id ${req.params.id} y nombre ${req.params.name}` });
});

app.post("/users/:id", async(req, res) => {
    res.json({ message: "Datos recibidos" });
});

app.put("/users/:id", async(req, res) => {
    res.json({ message: "Datos actualizados" });
});

app.delete("/users/:id", async(req, res) => {
    res.json({ message: `Dato con id ${req.params.id} eliminado` });
});





app.use((req, res) => {
    res.status(404).send('Api_Rest_Ful_MySql');
});

app.listen(PORT, () => {
  console.log(`server corriendo en http://localhost:${PORT}`);
});