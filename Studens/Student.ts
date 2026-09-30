export class Student{
    constructor(private id:number, private studentcode:number, private fullname:string, private gpa:number){}

    public getid(){return this.id};
    public getfullname(){return this.fullname};
    public getegpa(){return this.gpa};
    public getstudencode(){return this.studentcode};
    public getinfo(){return `User: ${this.id} ${this.studentcode} ${this.fullname} ${this.gpa}`};
        

    public isHonors(): boolean{
        return this.gpa >= 3.50;
    }
}