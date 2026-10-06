export class BorrowRecord {
    constructor(private id:number, private borrowerName:string, private bookIsbn:string, private borrowDate:string){
    }
    public getid(){return this.id};
    public getborrowerNamen(){return this.borrowerName};
    public getbookIsbn(){return this.bookIsbn};
    public getborrowDate(){return this.borrowDate};

    public setid(x:number){this.id = x};
    public setborrowerNamen(x:string){this.borrowerName = x};
    public setbookIsbn(x:string){this.bookIsbn = x};
    public setborrowDate(x:string){this.borrowDate = x};
   

}