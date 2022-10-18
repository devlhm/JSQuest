import { Elements } from "../components";
import * as signals from "./signals";

export class BoardMatrix {
	x: number;
	y: number;
	elements: Elements[] | any;
	robotPosition: number[];
	matrix: any;
	previousMoveId: string;

	constructor(
		collumnNumber: number,
		rowNumber: number,
		elements: Elements[]
	) {
		this.x = collumnNumber;
		this.y = rowNumber;
		this.elements = elements;
		this.robotPosition = this.getInitialRobotPosition(elements);
		this.matrix = this.makeArray(collumnNumber, rowNumber, elements);
		this.previousMoveId = "";
	}

	makeArray(w: number, h: number, elements: Elements[]) {
		// creating an empty matrix
		let bidimensional = new Array();

		for (let i = 0; i < h; i++) {
			bidimensional[i] = new Array(w);
		}

		// placing elements in matrix
		for (let x = 0; x < w; x++) {
			for (let y = 0; y < h; y++) {
				elements.forEach((element: Elements) => {
					if (element.x == x + 1 && element.y == y + 1) {
						bidimensional[y][x] = element.element;
					}
				});
			}
		}

		return bidimensional;
	}

	getInitialRobotPosition(elements: Elements[]) {
		let robotPosition = [0, 0];
		elements.forEach((element: Elements) => {
			if (element.element === "robot") {
				robotPosition = [element.x - 1, element.y - 1];
			}
		});
		return robotPosition;
	}

	attemptMovement(xOffset: number, yOffset: number, moveId: string) {
		// prevents method from running more than one time per request of attempt
		if (moveId === this.previousMoveId) return;
		this.previousMoveId = moveId;

		const newRobotPosition = [
			this.robotPosition[0] + xOffset,
			this.robotPosition[1] - yOffset,
		];

		if (this.checkMovement(newRobotPosition)) {
			console.log("old", this.robotPosition);

			this.matrix[newRobotPosition[1]][newRobotPosition[0]] = "robot";
			this.matrix[this.robotPosition[1]][this.robotPosition[0]] = undefined;

			signals.fireSignal("matrixChange", this.matrix);

			this.robotPosition = newRobotPosition;

			console.log(this.matrix);
		}
	}

	checkMovement(newRobotPosition: number[]): boolean {
		const intendedMatrixPos = this.matrix[newRobotPosition[1]][newRobotPosition[0]];

		if (
			intendedMatrixPos ===
			undefined &&
			newRobotPosition[0] < this.x &&
			newRobotPosition[0] >= 0 &&
			newRobotPosition[1] < this.y &&
			newRobotPosition[0] >= 0
		) {
			return true;
		} else {
			if (intendedMatrixPos.type === "box") {
				intendedMatrixPos.move()
			}

			return false;
		}
	}

	doMovement(newRobotPosition: number[]) {
		signals.fireSignal("robotMovement", newRobotPosition);
	}
}
