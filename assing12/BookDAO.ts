import { BaseDAO } from "./BaseDAO";
import { Book } from "./Book";
import Database from 'better-sqlite3';
interface BookRow {
    id: number;
    isbn: string;
    title: string;
    author: string;
    isAvailable: 0 | 1;
}

export class BookDAO extends BaseDAO {

constructor(dbpath: string = "library.db") {
        super(dbpath); 
    }
    protected initTable(): void {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS books (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                isbn        TEXT NOT NULL UNIQUE,
                title       TEXT NOT NULL,
                author      TEXT NOT NULL,
                isAvailable INTEGER NOT NULL DEFAULT 1 CHECK (isAvailable IN (0, 1))
            )
        `);
    }

    private toBook(row: BookRow): Book {
        return new Book(row.id, row.isbn, row.title, row.author, row.isAvailable === 1);
    }

    addBook(isbn: string, title: string, author: string): boolean {
        try {
            const result = this.db
                .prepare(`INSERT INTO books (isbn, title, author) VALUES (?, ?, ?)`)
                .run(isbn, title, author);
            return result.changes > 0;
        } catch {
            return false;  
        }
    }

    public findBookByIsbn(isbn: string): Book | null {
        const row = this.db
            .prepare(`SELECT * FROM books WHERE isbn = ?`)
            .get(isbn) as BookRow | undefined;
        return row ? this.toBook(row) : null;
    }

    public updateAvailability(isbn: string, isAvailable: boolean): boolean {
        const result = this.db
            .prepare(`UPDATE books SET isAvailable = ? WHERE isbn = ?`)
            .run(isAvailable ? 1 : 0, isbn);
        return result.changes > 0;
    }

    findAll(): Book[] {
        const rows = this.db
            .prepare(`SELECT id, isbn, title, author, isAvailable FROM books ORDER BY id`)
            .all() as BookRow[];
        return rows.map(row => this.toBook(row));
    }
}