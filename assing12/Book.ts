export class Book {
    constructor(private id:number, private isbn:string, private title:string, private author:string,private isAvailable:boolean){
    }
    public getid(){return this.id};
    public getisbn(){return this.isbn};
    public gettitle(){return this.title};
    public getauthor(){return this.author};
    public getisAvailable(){return this.isAvailable};

    public getInfo(): string {
    const status = this.isAvailable ? "Available" : "Unavailable";
    return `[${this.isbn}] ${this.title} by ${this.author} - Status: ${status}`;
    }
}