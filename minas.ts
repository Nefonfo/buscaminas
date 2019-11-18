import * as figlet from 'figlet';

export class Minas {
	private mapLiberty: Array<[number, number]> = [] // x,y ;
	private whereMine: Array<[number, number]> = [] // x,y ;
	private sizeSquareX: number;
	private sizeSquareY: number;
	private mineQuantity: number;
	markFinish: boolean;
	constructor(sizeSquareX: number, sizeSquareY: number, mineQuantity: number) {
		if (sizeSquareX >= 50 || sizeSquareX < 4 || sizeSquareX == null) {
			this.sizeSquareX = 5;
		} else {
			this.sizeSquareX = sizeSquareX;
		}
		if (sizeSquareY >= 50 || sizeSquareY < 4 || sizeSquareY == null) {
			this.sizeSquareY = 5;
		} else {
			this.sizeSquareY = sizeSquareY;
		}

		if (mineQuantity >= (sizeSquareY * sizeSquareX) || mineQuantity < 0 || mineQuantity == null) {
			this.mineQuantity = 4;
		} else {
			this.mineQuantity = mineQuantity;
		}
		this.generateRandomMap();
		this.markFinish = false;
	}

	private generateRandomMap(): void {
		for (let numberMine = 1; numberMine <= this.mineQuantity; numberMine++) {
			const resultRandX = Math.floor((Math.random() * this.sizeSquareX) + 1);
			const resultRandY = Math.floor((Math.random() * this.sizeSquareY) + 1);
			let flag: boolean = false;
			for (const mine of this.whereMine) {
				if (mine[0] === resultRandX && mine[1] === resultRandY) {
					flag = true;
					break;
				}
			}
			if (flag) {
				numberMine--;
			} else {
				this.whereMine.push([resultRandX, resultRandY]);
			}
		}
	}

	createMap(boom: boolean = false): void {
		process.stdin.write('     |');
		for (let sizeX = 1; sizeX <= this.sizeSquareX; sizeX++) {
			process.stdin.write(`${sizeX}|`);
		}
		process.stdin.write('\n');
		process.stdin.write('\n');
		for (let sizeY = 1; sizeY <= this.sizeSquareY; sizeY++) {
			if (sizeY > 9) {
				process.stdin.write(`|${sizeY}| `);
			} else {
				process.stdin.write(`|${sizeY}|  `);
			}
			process.stdin.write('|');
			for (let sizeX = 1; sizeX <= this.sizeSquareX; sizeX++) {
				if (sizeX > 9) {
					process.stdin.write(`${this.setIcon(sizeX, sizeY, boom)} |`);
				} else {
					process.stdin.write(`${this.setIcon(sizeX, sizeY, boom)}|`);
				}
			}
			process.stdin.write('\n');
		}
	}

	private setIcon(x: number, y: number, boom: boolean): string {
		let icon = '#';
		let data;
		if (boom) {
			data = this.whereMine;
		} else {
			data = this.mapLiberty;
		}
		for (const mine of data) {
			if (mine[0] === x && mine[1] === y) {
				if(boom){
					icon = '!';
				} else {
					icon = this.quantityAroundOfCell(x, y);
				}
			}
		}

		return icon;
	}

	selectCoordinate(x: number, y: number): string {
		let stringReturn: string;
		let selected: boolean = false;
		if (x > this.sizeSquareX || y > this.sizeSquareY) {
			stringReturn = 'COORDENADA INEXISTENTE';
		} else {
			for (const mine of this.mapLiberty) {
				if (mine[0] === x && mine[1] === y) {
					stringReturn = 'Esta celda ya fue seleccionada';
					selected = true;
				}
			}

			if (!selected) {
				this.mapLiberty.push([x, y]);
				stringReturn = 'MARCADO A SALVO :3';
				if (this.mapLiberty.length >= (this.sizeSquareX * this.sizeSquareY) - this.mineQuantity) {
					stringReturn = '¡¡¡GANASTE!!!';
					this.markFinish = true;
				}

			}



			for (const boom of this.whereMine) {
				if (boom[0] === x && boom[1] === y) {
					stringReturn = '¡¡¡¡¡¡¡¡BOOOOOOM!!!!!!!!!'
					this.markFinish = true;
				}
			}
		}
		return stringReturn;
	}

	quantityAroundOfCell(x: number, y: number): string {
		let result: any = 0;
		for (const mine of this.whereMine) {
			if (
				((mine[0] - 1) === y && (mine[1]) === x) ||
				((mine[0] + 1) === y && (mine[1]) === x) ||
				((mine[0]) === y && (mine[1] - 1) === x) ||
				((mine[0]) === y && (mine[1] + 1) === x) ||
				((mine[0] + 1) === y && (mine[1] + 1) === x) ||
				((mine[0] - 1) === y && (mine[1] + 1) === x) ||
				((mine[0] + 1) === y && (mine[1] - 1) === x) ||
				((mine[0] - 1) === y && (mine[1] - 1) === x)
				) {
				result++;
			}
		}
		if( result == 0){
			result = ' ';
		}
		return result.toString();
	}

	finalShow(ganar: boolean): void {
		if (ganar) {
			console.log('GANASTE!!!!!!!');
			this.createMap(true);
		} else {
			console.log('TU MAPA');
			console.log('SOLUCION');
			this.createMap(true);

		}
	}
}
