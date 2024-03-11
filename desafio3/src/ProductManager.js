import fs from "fs";

class ProductManager{
    #id = 0;
    constructor(path) {
        this.productos = [];
        this.path = path;
    }

    async getAgregarProducto(title, description, price, thumbnail, code, stock) {
        try {

            this.productos = await this.getProductos();

            if (!this.productos.find(producto => producto.code === code)) {

                const producto = {
                    id: this.#id++,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                }

                this.productos.push(producto)

                await fs.promises.writeFile(this.path, JSON.stringify(this.productos, null, '\t'));

                console.log("Haz agregado un producto con éxito");

                return producto;

            } else {
                console.error("El codigo de producto no se puede repetir");
            }
        } catch (error) {
            console.error("Error no se puede agregar el producto", error);
        }
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

    async getProductosById(id) {
        try {
            this.productos = await this.getProductos();
            const productoPorId = this.productos.find(producto => producto.id === parseInt(id));
            return productoPorId ? productoPorId : console.error('El id no existe', error);
        } catch (error) {
            console.error('Error al buscar el id del producto ', error);
        }
    }

    async actualizarProducto(id, update) {
        try {
            this.productos = await this.getProductos();
            const productos = await this.getProductosById(id);

            if (productos) {
                
                const actualizarProducto = {
                    ...productos,
                    ...update,
                    id 
                }

                const actualizarProductos = this.productos.map(productos => (productos.id === id) ? actualizarProducto : productos);

                await fs.promises.writeFile(this.path, JSON.stringify(actualizarProductos, null, '\t'));
                console.log("Producto actualizado");

                return actualizarProducto;
            }
            else {
                console.error("El id no existe", error);
            }
        } catch (error) {
            console.error("no se pudo actualizar el producto", error);
        }
    }

    async eliminarProducto(id) {
        try {
            const producto = await this.getProductosById(id);

            if (producto) {
                this.productos = await this.getProductos();

                const productos = this.productos.filter(producto => producto.id != id);

                await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
                console.log('Se elimino el producto!');
            }
            else {
                console.error('No se encontró producto con el ID especificado');
            }

        } catch (error) {
            console.error('Error al eliminar producto', error);
        }
    }
}

export default ProductManager;

