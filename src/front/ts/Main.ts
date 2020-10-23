/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

let devices: Array<DeviceInt>;

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

        let elem = document.querySelector('.collapsible.expandable');
        M.Collapsible.init(elem, {
                accordion: false
            });
        this.mf = new MyFramework();
        this.view = new ViewMainPage(this.mf);

        this.mf.getElementById("dev_id").hidden = true;
        this.mf.getElementById("boton").addEventListener("click", this);
        this.mf.getElementById("cancelar").addEventListener("click", this);

        this.mf.requestGET("http://localhost:8000/devices", this);
    }

    mostrarUsers(users: Array<User>): void {
        for (let user of users) {
            user.printInfo();
        }
    }

    handleGETResponse(status: number, response: string): void {
        console.log("Respuesta del servidor: " + response);

        devices = JSON.parse(response);

        console.log(devices);

        this.view.showDevices(devices);

        for (let device of devices) {
            let sw: HTMLElement = this.mf.getElementById(`dev_${device.id}`);
            sw.addEventListener("click", this);
            sw = this.mf.getElementById(`edit_dev_${device.id}`);
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
        
        let b: HTMLElement = this.mf.getElementByEvent(evt);
        console.log(b.id);

        console.log(b);

        if (b.id == "boton") {
            console.log(b.textContent);
            let name = <HTMLInputElement>this.mf.getElementById("name");
            let description = <HTMLInputElement>this.mf.getElementById("description");
            let light = <HTMLInputElement>this.mf.getElementById("light");
            let window = <HTMLInputElement>this.mf.getElementById("window");
            let dev_id = <HTMLInputElement>this.mf.getElementById("dev_id");
            let device_type:number;
            if (light.checked) {
                device_type = 0;
            } else {
                device_type = 1;
            }
            let data = { "name": name.value, "description": description.value, "type": device_type };            
            if (b.textContent == "Agregar dispositivo") {
                this.mf.requestPOST("http://localhost:8000/devices", data, this);
            } else if (b.textContent == "Guardar"){
                this.mf.requestPUT("http://localhost:8000/devices/" + dev_id.value, data, this);

                let elem = document.querySelector('.collapsible.expandable');
                M.Collapsible.getInstance(elem).close(0);
                
                this.mf.getElementById("boton").textContent = "Agregar dispositivo";
                this.mf.getElementById("dialog_symbol").textContent = "add_circle_outline";
                this.mf.getElementById("dialog_text").textContent = "Agregar dispositivo...";
            }
            name.value = "";
            description.value = "";
            this.mf.requestGET("http://localhost:8000/devices", this);
        } else if (b.id.startsWith("dev_")) {
            console.log(`Cambio en switch: ${b.id}`);
            console.log(`Está en on: ${(<HTMLInputElement>b).checked}`);
            let state: boolean = this.view.getSwitchStataById(b.id);
            let id:string = b.id.replace("dev_", "");
            let data = { "id": id, "state": state };

            this.mf.requestPUT("http://localhost:8000/devices/" + id, data, this);
        } else if(b.id.startsWith("edit_dev_")) {
            let id:string = b.id.replace("edit_dev_", "");
            console.log("Editar: " + id);
            let dev:DeviceInt = devices.find(dev => dev.id == id)
            
            let name = <HTMLInputElement>this.mf.getElementById("name");
            let description = <HTMLInputElement>this.mf.getElementById("description");
            let light = <HTMLInputElement>this.mf.getElementById("light");
            let window = <HTMLInputElement>this.mf.getElementById("window");
            let dev_id = <HTMLInputElement>this.mf.getElementById("dev_id");
            let elem = document.querySelector('.collapsible.expandable');
            M.Collapsible.getInstance(elem).open(0);
            name.value = dev.name;
            description.value = dev.description;
            if (dev.type == 0) {
                light.checked = true;
                window.checked = false;
            } else {
                light.checked = false;
                window.checked = true;
            }
            dev_id.value = id;
            this.mf.getElementById("boton").textContent = "Guardar";
            this.mf.getElementById("dialog_symbol").textContent = "edit";
            this.mf.getElementById("dialog_text").textContent = "Editar dispositivo...";
            M.updateTextFields();
        } else if(b.id == "cancelar"){
            this.mf.getElementById("boton").textContent = "Agregar dispositivo";
            this.mf.getElementById("dialog_symbol").textContent = "add_circle_outline";
            this.mf.getElementById("dialog_text").textContent = "Agregar dispositivo...";
            (<HTMLInputElement>this.mf.getElementById("name")).value = "";
            (<HTMLInputElement>this.mf.getElementById("description")).value = "";
            let elem = document.querySelector('.collapsible.expandable');
            M.Collapsible.getInstance(elem).close(0);
            M.updateTextFields();
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


//=======[ End of file ]=======================================================
        