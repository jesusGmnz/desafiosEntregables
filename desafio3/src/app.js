import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const PORT = 8080; 

const manager = new ProductManager(`productos.json`);

app.get('/productos', async (req, res) => {
    let productos = await manager.getProductos();
    const {limit} = req.query;

    if(limit){
        productos = productos.slice(2, limit);
    }

    res.send(productos);
});

app.get('/productos/:productoId', async (req, res) => {
    const productoId = req.params.productoId;

    let producto = await manager.getProductosById(productoId);

    producto ? res.send(producto) : console.error('Producto no encontrado');

})

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
})