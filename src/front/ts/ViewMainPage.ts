class ViewMainPage {

    private mf: MyFramework;

    constructor(mf: MyFramework) {
        this.mf = mf;
    }

    showDevices(devices: DeviceInt[]): void {
        let e: HTMLElement = this.mf.getElementById("device_list");

        for (let device of devices) {
            let image_name: string;
            switch (device.type) {
                case "1":
                    image_name = "lightbulb"
                    break;
                case "0":
                    image_name = "window"
                    break;
                default:
                    break;
            }
            e.innerHTML += `<li class="collection-item avatar">
                                <img src="static/images/${image_name}.png" alt="" class="circle">
                                <span class="title">${device.name}</span>
                                <p>${device.description}</p>
                                <a href="#!" class="secondary-content">
                                    <!-- Switch -->
                                    <div class="switch">
                                        <label>
                                        Off
                                        <input type="checkbox" id="dev_${device.id}" ${(device.state == "1") ? "checked" : ""}>
                                        <span class="lever"></span>
                                        On
                                    </label>
                                    </div>
                                </a>
                            </li>`
        }

    }

    getSwitchStataById(id: string): boolean {
        let e: HTMLElement = this.mf.getElementById(id);
        let i: HTMLInputElement = <HTMLInputElement>e;

        return i.checked;
    }
}