import express from "express";

const app =express();

//* pagina de inicio
app.get('/', (req, res) =>{
    res.send("Pagina de inicio")
})

//* ROUTES


//* puerto del servidor
const PORT = 8080;
app.listen(PORT, () =>{
    console.log(`Servido local corriendo en el puerto ${PORT}`);
})