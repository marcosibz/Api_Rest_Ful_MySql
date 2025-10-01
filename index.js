import express from "express";
import pool from './config/conexion.js';


const app = express();
const PORT = 3000;

app.use(express.json());

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

// app.get("/users/:id", async (req, res) => {
//     const sql = 'SELECT * FROM users WHERE id_user = ?';
//     const id = req.params.id;
//     try {
//         const connection = await pool.getConnection();
//         const [rows] = await connection.query(sql, [id]);
//         connection.release();
//         res.json(rows);
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener el usuario' });
//     }
// });

app.get("/users/:id", async(req, res) => {
    const id = parseInt(req.params.id);
    const sql = 'SELECT * FROM users WHERE id_user = ?';
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id]);
        connection.release();
        (rows[0]) ? res.json(rows[0]) : res.status(404).json({ error: 'Usuario no encontrado' }); 
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

app.post("/users", async(req, res) => {
    const values = req.body;
    const sql = 'INSERT INTO users SET ?';
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [values]);
        connection.release();
        console.log(rows)
        res.send('nuevo usuario creado');
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

app.put("/users/:id", async(req, res) => {
    const id = req.params.id;
    const newvalues = req.body;
    const sql = 'UPDATE users SET ? WHERE id_user = ?';

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [newvalues, id]);
        connection.release();
        rows.affectedRows === 0
            ? res.status(404).json({ error: 'Usuario no encontrado' })
            : res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

app.delete("/users/:id", async(req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM users WHERE id_user = ?';

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id]);
        connection.release();
        rows.affectedRows === 0
            ? res.status(404).json({ error: 'Usuario no encontrado' })
            : res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});



app.use((req, res) => {
    res.status(404).send('Api_Rest_Ful_MySql');
});

app.listen(PORT, () => {
  console.log(`server corriendo en http://localhost:${PORT}`);
});