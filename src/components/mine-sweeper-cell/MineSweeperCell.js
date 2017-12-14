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
		this.updateCellRequest(this.positionInArray, cellStatusParam);
	},
	setRedFlag(e){
		e.preventDefault();
		this.updateCell(true);
	},
	updateCellRequest(arrayCellPosition, cellStatus) {
		request
		.post(Base.BASE_ENDPOINTS + '/games/' + this.gameId + '/update_single_cell/')
		.query({array_cell_position: arrayCellPosition, cell_status: cellStatus, time: this.time})
		.end((err, res) => {
			var game = res.body;
			this.cellData.status = game.cells[arrayCellPosition].cell_status;

			if (this.cellData.status != 'RED_FLAG') {
				if (this.cellData.status == 'UNCOVERED') {
					this.updateAdjacentCellsRequest();
				} else{
					this.$emit('update', {cells : game.cells, status: game.grid_status});
				}
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

		inBoardAdjacentPositions.map(position => {
			if ((position.x >= 0 && position.x < this.positionInBoard.boardWidth) 
				&& (position.y >= 0 && position.y < this.positionInBoard.boardHeight)) {
				adjacentCellsPositions.push((this.positionInBoard.boardWidth * position.y + position.x))
			}
		});

		return adjacentCellsPositions.map(position => position.toString()).join(',');
	},
	updateAdjacentCellsRequest(){
		request
		.post(Base.BASE_ENDPOINTS + '/games/' + this.gameId + '/update_cells_group/')
		.query({positions_array: this.cellData.adjacentCellsPositions, time: this.time })
		.end((err, res) => {
			var game = res.body;
			this.$emit('update', {cells : game.cells, status: game.grid_status});
		})
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
