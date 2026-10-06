import { BookDAO } from "./BookDAO.ts";
import { BorrowRecordDAO } from "./BorrowRecordDAO.ts";
const bookDAO = new BookDAO("library.db");
bookDAO.addBook("ISBN-101", "Clean Code", "Robert C. Martin");

const borrowDAO = new BorrowRecordDAO("library.db",bookDAO);
console.log(borrowDAO.borrowBook("Somchai", "ISBN-101"));   // true
console.log(borrowDAO.borrowBook("Somsri", "ISBN-101"));    // false (ถูกยืมไปแล้ว)