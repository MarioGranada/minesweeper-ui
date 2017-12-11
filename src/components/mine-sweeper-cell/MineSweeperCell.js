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
			console.log(res.body);
			this.cellDataStatus = game.cells[arrayCellPosition].cell_status;
		});
	}
}

const props = {
	status: {type: String},
	positionInArray: {type: Number},
	cell: {type: Object},
	time: {type: Number},
	gameId: {type: String}
}

const data = function () {
	return {
		cellDataStatus: this.status
	}
}

export default {
	props,
	data,
	methods,
	computed: {
		cellStatusStyleClass: function () {
			return this.cellDataStatus == 'RED_FLAG' ? 'red-flag' : this.cellDataStatus.toLowerCase();
		}
	}
}
