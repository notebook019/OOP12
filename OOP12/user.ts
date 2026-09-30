export class User{
    constructor(private id:number, private name:string, private email:string){}

    public getid(){return this.id};
    public getname(){return this.name};
    public getemail(){return this.email};
    public getinfo(){return `User: ${this.id} ${this.name} ${this.email}`};
}