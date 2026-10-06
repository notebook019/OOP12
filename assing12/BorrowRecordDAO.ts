import Database from 'better-sqlite3';
import { BaseDAO } from "./BaseDAO";
import { BookDAO } from "./BookDAO";
import { BorrowRecord } from "./BorrowRecord";

export class BorrowRecordDAO extends BaseDAO {

   

constructor(dbpath: string = "library.db", private bookDAO: BookDAO) {
        super(dbpath); 
    
    }

    protected initTable(): void {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS borrow_records (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                borrowerName TEXT NOT NULL,
                bookIsbn     TEXT NOT NULL,
                borrowDate   TEXT NOT NULL
            )
        `);
    }

    public borrowBook(borrowerName: string, isbn: string): boolean {
        const book = this.bookDAO.findBookByIsbn(isbn);
        
        
        if (book === null) {
            return false;
        }
        
        if (book.getisAvailable() !== true) {
            return false;
        }

        try {
            // 3. เปลี่ยนสถานะหนังสือในฐานข้อมูลให้กลายเป็น "ถูกยืมแล้ว" (false)
            this.bookDAO.updateAvailability(isbn, false);

            // 4. บันทึกข้อมูลการยืมลงตาราง borrow_records
            const currentDate = new Date().toISOString(); // ดึงวันเวลาปัจจุบัน
            const result = this.db
                .prepare(`INSERT INTO borrow_records (borrowerName, bookIsbn, borrowDate) VALUES (?, ?, ?)`)
                .run(borrowerName, isbn, currentDate);

            // เช็คว่า Insert สำเร็จหรือไม่
            return result.changes > 0;

        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการยืมหนังสือ:", error);
            return false;
        }
    }
}