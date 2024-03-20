import express from 'express'
import cartsRouter from "./routes/carts.router.js"
import productsRouter from "./routes/products.routers.js"

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//pagina de inicio
app.get('/', (req, res) => {
    res.send("Bievenido")
})

//rutas
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

//puerto
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})