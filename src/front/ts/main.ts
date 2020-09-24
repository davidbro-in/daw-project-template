/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

let user = "TypesScript Users!";

//=======[ Main module code ]==================================================


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

class Main {
    main():void{
        console.log("Hola mundo desde main");
        let users = new Array<User>();

        users.push(new User(1, "Juan", "juan@mail.com"));
        users.push(new User(2, "Pedro", "juan@mail.com"));
        users.push(new User(3, "David", "juan@mail.com"));
        users.push(new User(4, "Ernesto", "juan@mail.com"));
        
        for (let i in users){
            users[i].printInfo();
        }
    }
}

function greeter(person) {
    return "Hello, " + person;
 }

 //document.body.innerHTML = greeter(user);

 window.onload = function() {
     let myMain = new Main();
     myMain.main();
 }
//=======[ End of file ]=======================================================
