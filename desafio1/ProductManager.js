class ProductManager{
    constructor(){
        this.producto = [];
    }

    getProducto(){
        return this.producto;
    }

    getAgregarProducto({title, description, price, thumbnail, code, stock}){
        if (typeof code === "undefined"){
            console.error("el producto debe tener un codigo");
        }if (this.producto.some(producto => producto.code === code))
            console.warn("codigo de producto en uso");

        const newproducto = {
            id: this.#getProductoById(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        this.producto.push(newproducto);
        return newproducto;
    }

    #getProductoById(){
        if(this.producto.length === 0) return 1;
        return this.producto[this.producto.length -1].id + 1;
    }
}

//* PM de productManager
const PM = new ProductManager();
PM.getAgregarProducto({
    title: "jabon manzana",
    description: "aroma a manzana",
    price: "1000",
    thumbnail: "sin imagen",
    code:"0001",
    stock:"20",
})
//*los dos primero casos funciona bien
PM.getAgregarProducto({
    title: "jabon cafe",
    description: "aroma a cafe",
    price: "1000",
    thumbnail: "sin imagen",
    code:"0002",
    stock:"10",
})
//*este ejemplo no tiene code da un error
PM.getAgregarProducto({
    title: "jabon Romero",
    description: "aroma a romero",
    price: "1000",
    thumbnail: "sin imagen",
    stock:"5",
})
//*este caso tiene code repetido da un warn
PM.getAgregarProducto({
    title: "jabon Romero",
    description: "aroma a romero",
    price: "1000",
    thumbnail: "sin imagen",
    code:"0001",
    stock:"5",
})
console.log(PM.getProducto());



