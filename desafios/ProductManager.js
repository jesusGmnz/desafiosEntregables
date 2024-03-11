const fs = require('fs');

class ProductManager {
    #id = 0;
    constructor(path) {
        this.productos = [];
        this.path = path;
    }

    async getProductos() {
        try {
            const productos = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(productos);
        } catch (error) {
            console.error("Error al obtener producto", error);
            return [];
        }
    }

    async getAgregarProducto({ title, description, price, thumbnail, code, stock }) {
        try {
            this.productos = await this.getProductos();

            const productoExistente = this.productos.some(producto => producto.code === code);
            if (productoExistente) {
                console.error("No se puede repetir el código");
                return;
            }

            const producto = {
                id: this.#id++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };

            this.productos.push(producto);

            await fs.promises.writeFile(this.path, JSON.stringify(this.productos, null, "\t"));
            console.log("Haz agregado un producto con éxito");
        } catch (error) {
            console.error("Error no se pudo agregar el producto", error);
        }
    }

    async getProductosById(id) {
        try {
            this.productos = await this.getProductos();
            const buscarProducto = this.productos.find(producto => producto.id === id);
            if (!buscarProducto) {
                console.error("No existe el producto con ese ID");
            }
            return buscarProducto;
        } catch (error) {
            console.error("Error de ID de producto", error);
        }
    }

    async actualizarProductos(id, update) {
        try {
            this.productos = await this.getProductos();
            const producto = await this.getProductosById(id);

            if (producto) {
                const actualizarProducto = {
                    ...producto,
                    ...update,
                    id
                };

                const actualizarProductos = this.productos.map(nuevoProducto =>
                    (nuevoProducto.id === id) ? actualizarProducto : nuevoProducto);

                await fs.promises.writeFile(this.path, JSON.stringify(actualizarProductos, null, "\t"));
                console.log("Producto actualizado con éxito");
                return actualizarProducto;
            } else {
                console.error("No existe producto con ese ID");
            }
        } catch (error) {
            console.error("No se pudo actualizar el producto", error);
        }
    }

    async eliminarProducto(id) {
        try {
            const producto = await this.getProductosById(id);

            if (producto) {
                this.productos = await this.getProductos();

                const productosFiltrados = this.productos.filter(producto => producto.id != id);

                await fs.promises.writeFile(this.path, JSON.stringify(productosFiltrados, null, "\t"));
                console.log("Producto eliminado");
            } else {
                console.error("No existe producto con ese ID");
            }
        } catch (error) {
            console.error("Error no se pudo eliminar producto", error);
        }
    }
}

// PM de productManager
const PM = new ProductManager(`${__dirname}\\productos.json`);

const Run = async () => {
    await PM.getProductos();

    await PM.getAgregarProducto({
        title: "jabon manzana",
        description: "aroma a manzana",
        price: "1000",
        thumbnail: "sin imagen",
        code: "0001",
        stock: "20",
    });

    await PM.getAgregarProducto({
        title: "jabon Mandarina",
        description: "aroma a mandarina",
        price: "1000",
        thumbnail: "sin imagen",
        code: "0002",
        stock: "20",
    });
};

Run();

