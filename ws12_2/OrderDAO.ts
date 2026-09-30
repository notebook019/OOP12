import { Product } from './Product.ts';
import { BaseDAO } from './BaseDAO.ts';
import { Order } from './Order.ts';
import { ProductDAO } from './ProductDAO.ts';

export class OrderDAO extends BaseDAO{
    protected iniTable(): void {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS orders (
                id  INTEGER PRIMARY KEY AUTOINCREMENT,
                productname TEXT NOT NULL,
                quantity NUMERIC NOT NULL,
                totalprice NUMERIC NOT NULL
            )
        `)
    }

    public createOrder(product: Product, quantity:number): boolean{
        const productDAO = new ProductDAO();
        const prod = productDAO.findProductById(product.getId());
        if(!prod){
            console.log("ไม่พบสินค้ารายการนี้");
            return false;
        }
        if(product.getStock() >= quantity){
            const newStock = product.getStock() - quantity;
            const total = product.getPrice() * quantity;
            const stmt = this.db.prepare('INSERT INTO orders(productname, quantity, totalprice)VALUES (?,?,?)');
            const result = stmt.run(prod.getName(), quantity, total);
            if(result.changes > 0){
                productDAO.updateStock(prod.getId(), newStock);
                console.log(`สร้าง Order ${quantity} x ${prod.getName()} = ${total} เรียบร้อยแล้ว`);
                return true;
            }
        }else{
            console.log(`สินค้า ${prod.getName()} ในคลังไม่เพียงพอ คงเหลือ ${prod.getStock()}`);
            return false;
        }
        return false;
    }
}