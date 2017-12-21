import MineSweeperCell from '../mine-sweeper-cell/MineSweeperCell.vue';

const methods = {
	updateGame(newGameData) {
		var initialRows = this.game.rows;
    	this.game.cells = newGameData.cells;

    	if (!newGameData.isRedFlag) {
    		this.game.rows = 0;
    		setTimeout(() => {
    			this.game.rows = initialRows;
    		}, 2);
    	}
    	this.$emit('update', newGameData);
    }
}

const props = {
	game: {type: Object}
}

const data = function () {
	return {
		gameData: this.game
	}
}

export default {
	props,
	data,
	methods,
	components: {
		MineSweeperCell
	}
}
