class User {
    private _id:number;
    private _name:string;
    private _email:string;
    private _isLogged:boolean;
    
    constructor (id:number, name:string, email:string){
        this._id = id;
        this._name = name;
        this._email = email;
    }
    
    set id(id:number){
        this._id = id;
    }
    
    get id():number {
        return this._id;
    }
    
    set name(name:string){
        this._name = name;
    }
    
    get name():string {
        return this._name;
    }
    
    set email(email:string){
        this._email = email;
    }
    
    get email():string {
        return this._email;
    }
    
    printInfo():void {
        console.log("id: " + this.id + ", nombre: " + this.name + ", email: " + this.email);
    }
}