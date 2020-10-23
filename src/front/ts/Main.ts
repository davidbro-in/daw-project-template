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

interface DeviceInt {
    id: string;
    name: string;
    description: string;
    state: string;
    type: number;
}

class Main implements EventListenerObject, GETResponseListener, POSTResponseListener, PUTResponseListener {

    public mf: MyFramework;
    public view: ViewMainPage;

    counter: number = 0;

    main(): void {
        console.log("Hola mundo desde main");
        let users = new Array<User>();

        users.push(new User(1, "Juan", "juan@mail.com"));
        users.push(new User(2, "Pedro", "pedro@mail.com"));
        users.push(new User(3, "David", "david@mail.com"));
        users.push(new User(4, "Ernesto", "ernesto@mail.com"));

        this.mostrarUsers(users);

        this.mf = new MyFramework();
        this.view = new ViewMainPage(this.mf);

        this.mf.getElementById("boton").addEventListener("click", this);

        this.mf.requestGET("http://localhost:8000/devices", this);

        document.getElementsByClassName(".collapsible");

    }

    mostrarUsers(users: Array<User>): void {
        for (let user of users) {
            user.printInfo();
        }
    }

    handleGETResponse(status: number, response: string): void {
        console.log("Respuesta del servidor: " + response);

        let data: Array<DeviceInt> = JSON.parse(response);

        console.log(data);

        this.view.showDevices(data);

        for (let device of data) {
            let sw: HTMLElement = this.mf.getElementById(`dev_${device.id}`);
            sw.addEventListener("click", this);
        }
    }

    handlePOSTResponse(status: number, response: string): void {
        console.log(status);
        console.log(response);
    }

    handlePUTResponse(status: number, response: string): void {
        console.log(status);
        console.log(response);
    }

    handleEvent(evt: Event): void {
        console.log(`Evento: ${evt.type}`);
        console.log(this);

        let b: HTMLElement = this.mf.getElementByEvent(evt);

        console.log(b);

        if (b.id == "boton") {
            let name = <HTMLInputElement>this.mf.getElementById("name");
            let description = <HTMLInputElement>this.mf.getElementById("description");
            let light = <HTMLInputElement>this.mf.getElementById("light");
            let window = <HTMLInputElement>this.mf.getElementById("window");
            let device_type:number;
            if (light.checked) {
                device_type = 0;
            } else {
                device_type = 1;
            }
            let data = { "name": name.value, "description": description.value, "type": device_type };            

            this.mf.requestPOST("http://localhost:8000/devices", data, this);
            name.value = "";
            description.value = "";
        } else if (b.id.startsWith("dev_")) {
            console.log(`Cambio en switch: ${b.id}`);
            console.log(`Está en on: ${(<HTMLInputElement>b).checked}`);
            let state: boolean = this.view.getSwitchStataById(b.id);
            let data = { "id": b.id, "state": state };

            this.mf.requestPUT(`http://localhost:8000/devices/${b.id.replace("dev_", "")}?state=${(<HTMLInputElement>b).checked}`, data, this);
        }
    }
}

function greeter(person) {
    return "Hello, " + person;
}

//document.body.innerHTML = greeter(user);

window.onload = function () {
    let myMain = new Main();
    myMain.main();
}

var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, {
  accordion: false
});

//=======[ End of file ]=======================================================
        