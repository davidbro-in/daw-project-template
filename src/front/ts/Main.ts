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

class Main implements EventListenerObject, GETResponseListener{
    
    public mf:MyFramework;
    
    main():void{
        console.log("Hola mundo desde main");
        let users = new Array<User>();
        
        users.push(new User(1, "Juan", "juan@mail.com"));
        users.push(new User(2, "Pedro", "pedro@mail.com"));
        users.push(new User(3, "David", "david@mail.com"));
        users.push(new User(4, "Ernesto", "ernesto@mail.com"));
        
        this.mostrarUsers(users);
        
        this.mf = new MyFramework();
        document.addEventListener("click", this);
        
        this.mf.requestGET ("Devices.txt", this);
        
    }
    
    mostrarUsers(users:Array<User>):void {
        for (let user of users){
            user.printInfo();
        }
    }
    
    handleGETResponse(status: number, response: string): void {
        console.log ("Respuesta del servidor: " + response);
    }

    handleEvent(evt: Event): void {
        console.log("Se hizo click!");
        console.log(this);
        let element:HTMLElement = this.mf.getElementByEvent(evt);
        element.textContent = "Hola Mundo!";
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
