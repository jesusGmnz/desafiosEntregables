const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.producto = [];
        this.path = path;
    }

    async getProducto() {
        try {
            const producto = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(producto);
        } catch (error) {
            console.error("Error al obtener producto",error);
            return [];
        }
    }

    async getAgregarProducto({ title, description, price, thumbnail, code, stock }) {
        try {
            this.producto = await this.getProducto();

            const nuevoProducto = {
                id: this.producto.length + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            }

            this.producto.find(nuevoProducto => {
                if (nuevoProducto.code === code) {
                    console.error("No puede repetir el codigo");
                }
                return;

            }) ? null : this.producto.push(nuevoProducto);

            await fs.promises.writeFile(this.path, JSON.stringify(this.producto, null, "\t"));
            console.log("haz agregado un producto con exito");

            return producto;

        } catch (error) {
            console.error("Error no se pudo agregar el producto", error);
        }
    }

    async getProductoById(id){
        try {
            this.producto = await this.getProducto();
            const buscarProducto = this.producto.find(producto => producto.id === id)
            return buscarProducto ? buscarProducto : console.error("No existe el producto con ese ID");
        } catch (error) {
            console.error("Error de Id de producto", error);
        }
    }

    async actualizarProducto(id, update){
        try {

            this.producto = await this.getProducto();
            const producto = await this.getProductoById(id)

            if (producto) {
                const actualizarProducto = {
                    ...producto,
                    ...update,
                    id
                }

                const actualizarProductos = this.producto.map(nuevoProducto => 
                    (nuevoProducto.id === id) ? actualizarProducto : producto);

                await fs.promises.writeFile(this.path, JSON.stringify(actualizarProductos,null,"\t"));
                console.log("Producto actualizado con exito");

                return actualizarProducto;
            }else{
                console.error("No existe producto con ese ID", error);
            }
        } catch (error) {
            console.error("No se pudo actualizar el producto", error);
        }
    }

    async eliminarProducto(id){
        try {
            const producto = await this.getProductById(id);

            if (producto) {
                this.producto = await this.getProducto();

                const producto = this.producto.filter(producto => producto.id != id);

                await fs.promises.writeFile(this.path, JSON.stringify(producto,null,"\t"));
                console.log("Producto eliminado");
            }else{
                console.error("No existe producto con ese ID", error);
            }
        } catch (error) {
            console.error("Error no se pudo eliminar producto", error);
        }
    }
}
//* PM de productManager
const PM = new ProductManager(`${__dirname}/productos.json`);

const ejecutar = async () =>{
    let producto = await PM.getProducto();

    await PM.getAgregarProducto({
        title: "jabon manzana",
        description: "aroma a manzana",
        price: "1000",
        thumbnail: "sin imagen",
        code: "0001",
        stock: "20",
    })

}
ejecutar();







