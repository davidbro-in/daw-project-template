![header](doc/header.png)

# Proyecto final DAW
Este proyecto permite:
* Visualizar una lista de dispositivos.
* Cambiar el estado de cada uno.
* Agregar nuevos dispositivos.
* Editar nombre, descripción y tipo de los dispositivos guardados.

## No implementado
* No es posible borrar dispositivos.

Author:

* David Broin

## Prerequisitos
* docker
* docker-compose

## Instrucciones de uso
* Ejecutar
```sh
docker-compose up
```
* En el navegador abrir http://localhost:8000

**NOTA:** Es normal que la primera vez nodeJS no se pueda conectar a la base de datos, por favor ejecutar
```sh
docker-compose down
docker-compose up
```

## Licencia

This project is published under GPLV3+ licence.

![footer](doc/footer.png)

