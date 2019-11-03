import * as scanf from 'scanf';
import * as figlet from 'figlet';
import * as clear from 'clear';
import { Minas } from './minas';
const bootstrap = async () => {

	figlet('BUSCAMINAS', {
		font: 'Ghost',
		horizontalLayout: 'default',
		verticalLayout: 'default'
	}, async function (err, data) {
		let cycle: boolean = false;
		do {
			cycle = await begin();
		}while(cycle);
	});

}

async function begin(): Promise<boolean> {
	console.log('¿CUANTAS MINAS QUIERES?');
	const quantity = scanf("%d");
	console.log('¿ANCHO HORIZONTAL?');
	const sizeX = scanf('%d');
	console.log('¿ANCHO VERTICAL?');
	const sizeY = scanf('%d');
	const dataMina = new Minas(sizeX, sizeY, quantity);
	let result: string;
	do {
		dataMina.createMap();
		let coordX: number;
		let coordY: number;
		do {
			console.log('ESCOGE COORDENADA EN EJE X');
			coordX = scanf('%d');
		}while(isNaN(coordX) || coordX == null);
		do {
			console.log('ESCOGE COORDENADA EN EJE Y');
			coordY = scanf('%d');
		}while(isNaN(coordY) || coordY == null);
		result = dataMina.selectCoordinate(coordX, coordY);
		console.log(result);
		await sleep(2000);
	} while (!dataMina.markFinish);

	dataMina.finalShow((result === '¡¡¡GANASTE!!!'));
	await sleep(2000);
	console.log('¿Deseas continuar? S/N(o cualquier tecla)');
	const repeatable = scanf('%s').toUpperCase();
	console.log(repeatable);
	return (repeatable === 'S');
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

bootstrap();