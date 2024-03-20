import fs from 'fs';

export default class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = this.loadProducts();
        this.id = this.productId();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error(error)
            return [];
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
        } catch (error) {
            console.error(error)
            console.error('Error guardando productos:', error);
        }
    }

    productId() {
        const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
        return maxId + 1;
    }

    addProduct(productData) {
        console.log('Received product data:', productData);
        if (!productData.title || !productData.description || !productData.price || !productData.status || !productData.code || !productData.stock) {
            console.error("Error: Todos los campos son obligatorios.");
            return;
        }

        const codeExist = this.products.some((product) => product.code === productData.code);

        if (codeExist) {
            console.error(`Error: Producto con código ${productData.code} ya existe.`);
            return
        }

        const product = {
            id: this.id++,
            ...productData,
            thumbnails: productData.thumbnails ?? []
        };

        console.log(`Añadiendo producto...`)
        this.products.push(product);
        this.saveProducts();
        console.log(`${product.title} agregado.`)
    }

    getProducts(limit) {
        console.log(`Buscando productos...`)
        console.log(this.products);
        if (limit) {
            return this.products.slice(0, limit);
        }
        return this.products
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id == id);

        if (!product) {
            console.error(`Error: Producto con id ${id} no encontrado.`);
            return;
        }
        console.log(`Buscando producto con id ${id}...`)
        console.log(product);
        return product;
    }

    updateProduct(id, updatedFields) {
        if (!id || !updatedFields) {
            console.error("Error: Todos los campos son obligatorios.");
            return;
        }

        const index = this.products.findIndex((product) => product.id === id);

        if (index === -1) {
            console.error(`Error: Producto con ID ${id} no encontrado.`);
            return;
        }

        if (updatedFields.code && this.products.some((product) => product.code === updatedFields.code)) {
            console.error(`Error: Producto con código ${updatedFields.code} ya existe.`);
            return
        }

        console.log(`Actualizando producto con ID ${id}`);

        this.products[index] = { ...this.products[index], ...updatedFields };

        this.saveProducts();
        console.log(`Producto con ID ${id} actualizado...`);
        this.getProductById(id);
    }

    deleteProduct(id) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
            console.error(`Error: Producto con id ${id} no encontrado.`);
            return
        }
        console.log(`Eliminando producto con id ${id}...`)
        this.products = this.products.filter((product) => product.id !== id);
        this.saveProducts();
        console.log(`Producto ${id} eliminado.`)
    }
}