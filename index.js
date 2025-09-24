import express from "express";

const app = express();
const PORT = 3000;


app.get("/", (req, res) => {
    res.send('Api_Rest_Ful_MySql');
});

app.post("", (req, res) => {
    res.json({ message: "Datos recibidos" });
});

app.put("", (req, res) => {
    res.json({ message: "Datos actualizados" });
});

app.delete("/data/:id", (req, res) => {
    res.json({ message: `Dato con id ${req.params.id} eliminado` });
});





app.use((req, res) => {
    res.status(404).send('Api_Rest_Ful_MySql');
});

app.listen(PORT, () => {
  console.log(`server corriendo en http://localhost:${PORT}`);
});