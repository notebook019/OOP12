import { Product } from './Product.ts';
import { BaseDAO } from './BaseDAO.ts';

export class ProductDAO extends BaseDAO{
    protected iniTable(): void {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS products (
                id  INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                price NUMERIC NOT NULL,
                stock NUMERIC NOT NULL
            )
        `)
    }

    public addProduct(name: string, price:number, stock:number): boolean{
        const stmt = this.db.prepare('INSERT INTO products(name, price, stock)VALUES (?,?,?)');
        const result = stmt.run(name, price, stock);
        return result.changes > 0;
    }

    public findAll(): Product[]{
        const stmt = this.db.prepare('SELECT * from products');
        const rows = stmt.all() as {id:number, name:string, price:number, stock:number}[];
        return rows.map(row => new Product(row.id, row.name, row.price, row.stock));
    }

    public findProductById(id: number): Product | null{
        const stmt = this.db.prepare('SELECT * from products where id=?');
        const row = stmt.get(id) as {id:number, name:string, price:number, stock:number};
        if(!row) return null;
        return new Product(row.id, row.name, row.price, row.stock);
    }

    public updateStock(id:number, newStock:number): boolean{
        const stmt = this.db.prepare('UPDATE products SET stock=?where id=?');
        const result = stmt.run(newStock, id);
        return result.changes > 0;
    }
}