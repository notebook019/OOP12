import { BaseDAO } from "./BaseDAO";
import { Student } from "./Student";

export class sutdentDAO extends BaseDAO{
    protected initTable(): void {
        this.db.exec(`CREATE TABLE IF NOT EXISTS student(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            studentcode TEXT NOT NULL,
            fullname TEXT NOT NULL,
            gpa TEXT NOT NULL
            )`)
    }
    insert (id:number, studentcode:string, fullname:string, gpa:number):boolean{
        const stmt = this.db.prepare(`INSERT INTO student (id,studentcode,fullname, gpa) VALUES(?,?,?,?)`)
        const result = stmt.run(id ,studentcode, fullname, gpa);
        return result.changes >0;
    }
    findAll():Student[]{
        const stmt = this.db.prepare(`SELECT * FROM student`)
        const rows = stmt.all() as {id:number,studentcode:number, fullname:string, gpa:number}[];
        return rows.map(row=> new Student(row.id, row.studentcode, row.fullname, row.gpa));
    }

}