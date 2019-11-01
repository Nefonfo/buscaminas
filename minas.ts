
export class Minas {
	private mapLiberty: Array<[number, number]> = [] // x,y ;
	private whereMine: Array<[number, number]> = [] // x,y ;
	private sizeSquareX: number;
	private sizeSquareY: number;
	private mineQuantity: number;
	constructor(sizeSquareX: number, sizeSquareY: number, mineQuantity: number) {
		if (sizeSquareX > 10 || sizeSquareX < 1) {
			this.sizeSquareX = 10;
		} else {
			this.sizeSquareX = sizeSquareX;
		}
		if (sizeSquareY >= 50 || sizeSquareY < 9) {
			this.sizeSquareY = 10;
		} else {
			this.sizeSquareY = sizeSquareY;
		}

		if (mineQuantity >= (sizeSquareY * sizeSquareX) || mineQuantity < 0) {
			this.mineQuantity = 5;
		} else {
			this.mineQuantity = mineQuantity;
		}
		this.generateRandomMap();
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

	createMap(): void {
		process.stdin.write('          |');
		for(let sizeX = 1; sizeX <= this.sizeSquareX; sizeX ++) {
			process.stdin.write(`${sizeX}|`);
		}
		process.stdin.write('\n');
		process.stdin.write('\n');
		console.log('          '+'=='.repeat(this.sizeSquareX) + "=");
		for(let sizeY = 1; sizeY <= this.sizeSquareY; sizeY++) {
			if(sizeY > 9){
				process.stdin.write(`|${sizeY}|      |`);
			}else{
				process.stdin.write(`|${sizeY}|       |`);
			}
			for(let sizeX = 1; sizeX <= this.sizeSquareX; sizeX ++) {
				process.stdin.write(`${this.setIcon(sizeX, sizeY)}|`);
			}
			process.stdin.write('\n');
			console.log('          '+'=='.repeat(this.sizeSquareX) + "=");
		}
	}

	private setIcon(x: number, y: number): string {
		let icon = '#';

		for(const mine of this.mapLiberty) {
			if(mine[0] === x && mine[1] === y) {
				icon = 'X'
			}
		}

		return icon;
	}

	selectCoordinate(x: number, y: number) {

	}
}
