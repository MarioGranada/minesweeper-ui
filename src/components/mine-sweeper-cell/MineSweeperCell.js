import request from 'superagent';
import Base from '../../services/base';

const methods = {
	updateCell(isRedFlag) {
		var cellStatusParam;
		if (isRedFlag) {
			cellStatusParam = 'RED_FLAG';
		} else {
			cellStatusParam = 'UNCOVERED';
		}
		this.updateCellRequest(this.positionInArray, cellStatusParam, this.time);

	},
	setRedFlag(e){
		e.preventDefault();
		this.updateCell(true);
	},
	updateCellRequest(arrayCellPosition, cellStatus, time) {
		request
		.post(Base.BASE_ENDPOINTS + '/games/' + this.gameId + '/update_single_cell/')
		.query({array_cell_position: arrayCellPosition, cell_status: cellStatus, time: time})
		.end((err, res) => {
			var game = res.body;
			this.cellData.status = game.cells[arrayCellPosition].cell_status;

			if (this.cellData.status != 'RED_FLAG') {
				this.$emit('update', {cells : game.cells, status: game.grid_status});
			}
		});
	},
	setAdjacentCellsPositions() {
		var adjacentCellsPositions = [],
		inBoardAdjacentPositions = [
			{x: this.positionInBoard.x - 1, y: this.positionInBoard.y - 1},//Upper Row
			{x: this.positionInBoard.x - 1, y: this.positionInBoard.y},
			{x: this.positionInBoard.x - 1, y: this.positionInBoard.y + 1},
			{x: this.positionInBoard.x, y: this.positionInBoard.y - 1},//Middle Row 
			{x: this.positionInBoard.x, y: this.positionInBoard.y + 1},
			{x: this.positionInBoard.x + 1, y: this.positionInBoard.y - 1},// Lower Row
			{x: this.positionInBoard.x + 1, y: this.positionInBoard.y},
			{x: this.positionInBoard.x + 1, y: this.positionInBoard.y + 1}
		];
		console.log('Board width: '+ this.positionInBoard.boardWidth);
		console.log('Board height: '+ this.positionInBoard.boardHeight);

		inBoardAdjacentPositions.map(position => {
			if ((position.x >= 0 && position.x < this.positionInBoard.boardWidth) 
				&& (position.y >= 0 && position.y < this.positionInBoard.boardHeight)) {
				console.log("test position:" +position.x + ';' + position.y);
				adjacentCellsPositions.push((this.positionInBoard.boardWidth * position.y + position.x))
			}
		});
		console.log('adjacent to: ' + this.positionInBoard.x + ';' + this.positionInBoard.y);
		console.log(adjacentCellsPositions.map(position => position.toString()).join(','));
		console.log('end adjacent');

		return adjacentCellsPositions.map(position => position.toString()).join(',');
	}
}

const props = {
	status: {type: String},
	positionInArray: {type: Number},
	positionInBoard: {type: Object},
	cell: {type: Object},
	time: {type: Number},
	gameId: {type: String}
}

const data = function () {
	return {
		cellData: {
			status: this.status,
			adjacentCellsPositions: this.setAdjacentCellsPositions()
		}
	}
}

export default {
	props,
	data,
	methods,
	computed: {
		cellStatusStyleClass: function () {
			return this.cellData.status == 'RED_FLAG' ? 'red-flag' : this.cellData.status.toLowerCase();
		}
	}
}
