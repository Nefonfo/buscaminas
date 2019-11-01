"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanf = require("scanf");
const minas_1 = require("./minas");
const figlet = require("figlet");
const bootstrap = () => {
    figlet('BUSCAMINAS', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
        begin();
    });
};
const begin = () => {
    console.log('¿CUANTAS MINAS QUIERES?');
    const quantity = scanf("%d");
    console.log('¿ANCHO HORIZONTAL?');
    const sizeX = scanf('%d');
    console.log('¿ANCHO VERTICAL?');
    const sizeY = scanf('%d');
    const dataMina = new minas_1.Minas(sizeX, sizeY, quantity);
    dataMina.createMap();
};
bootstrap();
