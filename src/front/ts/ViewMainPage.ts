class ViewMainPage {

    private mf:MyFramework;

    constructor(mf:MyFramework){
        this.mf = mf;
    }

    showDevices(devices:DeviceInt[]):void {
        let e:HTMLElement = this.mf.getElementById("device_list");
        
        for(let device of devices){
            e.innerHTML += `<li class="collection-item avatar">
                                <img src="static/images/lightbulb.png" alt="" class="circle">
                                <span class="title">${device.name}</span>
                                <p>${device.description}</p>
                                <a href="#!" class="secondary-content">
                                    <!-- Switch -->
                                    <div class="switch">
                                        <label>
                                        Off
                                        <input type="checkbox" id="dev_${device.id}" checked>
                                        <span class="lever"></span>
                                        On
                                    </label>
                                    </div>
                                </a>
                            </li>`
        }
        
    }

    getSwitchStataById(id:string):boolean{
        let e:HTMLElement = this.mf.getElementById(id);
        let i:HTMLInputElement = <HTMLInputElement>e;

        return i.checked;
    }
}