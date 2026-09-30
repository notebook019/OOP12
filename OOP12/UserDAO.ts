import { BaseDAO } from "./BaseDAO";
import { User } from "./user";

export class UserDAO extends BaseDAO{
    protected initTable(): void {
        this.db.exec(`CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL
            )`)
    }
    insert (name:string, email:string):boolean{
        const stmt = this.db.prepare(`INSERT INTO users (name, email) VALUES(?,?)`)
        const result = stmt.run(name, email);
        return result.changes >0;
    }
    findAll():User[]{
        const stmt = this.db.prepare(`SELECT * FROM users`)
        const rows = stmt.all() as {id:number, name:string, email:string}[];
        return rows.map(row=> new User(row.id, row.name, row.email));
    }

}