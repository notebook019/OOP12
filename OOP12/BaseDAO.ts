import Database from "better-sqlite3";

export class BaseDAO{
        protected db:Database.Database;
        constructor(dbpath:string = "app.db"){
            this.db = new Database(dbpath);
            this.initTable();
        }
        protected abstract initTable():void;
}