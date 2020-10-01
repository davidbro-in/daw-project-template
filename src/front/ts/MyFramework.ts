class MyFramework {
    getElementById(id:string):HTMLElement {
        let e:HTMLElement;
        e = document.getElementById("boton");
        return e;
    }

    getElementByEvent(evt:Event):HTMLElement {
        return <HTMLElement>evt.target;
    }

}