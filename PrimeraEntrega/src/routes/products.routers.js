import { Router } from "express";
import ProductManager from '../productManager.js'

const router = Router();

const productManagerInstance = new ProductManager("./data/products.json");

router.get('/', async (req, res) => {
    let limit = +req.query.limit;
    const products = await productManagerInstance.getProducts(limit);
    res.send({ products })
})

router.get('/:productId', async (req, res) => {
    let productId = +req.params.productId;
    let product = await productManagerInstance.getProductById(productId);

    if (!product) {
        return res.send({ error: 'Producto no encontrado' });
    }
    res.send({ product })
})

router.post('/', async (req, res) => {
    const { title, description, code, price, stock, category } = req.body;

    try {
        await productManagerInstance.addProduct({
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
        })
    } catch (error) {
        console.error(error)
        res.status(400).send({ status: 'error', error: 'ha ocurrido un error' })
    }
    res.send({ status: 'success', message: 'producto agregado' });
})

router.put('/:productId', async (req, res) => {
    const productId = +req.params.productId;
    const productData = req.body;

    try {
        await productManagerInstance.updateProduct(productId, productData);
    } catch (error) {
        console.error(error)
        res.status(400).send({ status: 'error', error: 'ha ocurrido un error' })
    }

    res.send({ status: 'success', message: 'producto editado' });
})

router.delete('/:productId', async (req, res) => {
    const productId = +req.params.productId;

    try {
        await productManagerInstance.deleteProduct(productId);
    } catch (error) {
        console.error(error)
        res.status(400).send({ status: 'error', error: 'ha ocurrido un error' })
    }

    res.send({ status: 'success', message: 'producto eliminado' });
})

export default router