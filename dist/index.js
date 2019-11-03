"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const scanf = require("scanf");
const figlet = require("figlet");
const minas_1 = require("./minas");
const bootstrap = () => __awaiter(this, void 0, void 0, function* () {
    figlet('BUSCAMINAS', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function (err, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let cycle = false;
            do {
                cycle = yield begin();
            } while (cycle);
        });
    });
});
function begin() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('¿CUANTAS MINAS QUIERES?');
        const quantity = scanf("%d");
        console.log('¿ANCHO HORIZONTAL?');
        const sizeX = scanf('%d');
        console.log('¿ANCHO VERTICAL?');
        const sizeY = scanf('%d');
        const dataMina = new minas_1.Minas(sizeX, sizeY, quantity);
        let result;
        do {
            dataMina.createMap();
            let coordX;
            let coordY;
            do {
                console.log('ESCOGE COORDENADA EN EJE X');
                coordX = scanf('%d');
            } while (isNaN(coordX) || coordX == null);
            do {
                console.log('ESCOGE COORDENADA EN EJE Y');
                coordY = scanf('%d');
            } while (isNaN(coordY) || coordY == null);
            result = dataMina.selectCoordinate(coordX, coordY);
            console.log(result);
            yield sleep(2000);
        } while (!dataMina.markFinish);
        dataMina.finalShow((result === '¡¡¡GANASTE!!!'));
        yield sleep(2000);
        console.log('¿Deseas continuar? S/N(o cualquier tecla)');
        const repeatable = scanf('%s').toUpperCase();
        console.log(repeatable);
        return (repeatable === 'S');
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
bootstrap();
