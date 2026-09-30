import { OrderDAO } from "./OrderDAO.ts";
import { ProductDAO } from "./ProductDAO.ts";

const productDAO = new ProductDAO();
const orderDAO = new OrderDAO();

productDAO.addProduct('Keyboard',500,60);
productDAO.addProduct('Mouse',200,100);
productDAO.addProduct('Lenovo PC',2000,10);
productDAO.addProduct('HP Printer',7500,20);

const products = productDAO.findAll();
products.forEach(p =>{
    console.log(p.getInfo());
})

let id=3;
console.log("================");
const product = productDAO.findProductById(id);
console.log(product?.getInfo());

if(product){
    orderDAO.createOrder(product, 2);
    const updateProduct = productDAO.findProductById(id);
    console.log(`สินค้า ${product.getName()} คงเหลือ ${updateProduct?.getStock()}`);
}

