import MineSweeperCell from '../mine-sweeper-cell/MineSweeperCell.vue';
// import request from 'superagent';
// import Base from '../../services/base';

const methods = {
	initGame() {

	}
}

const props = {
	game: {type: Object}
}

export default {
	props,
	methods,
	components: {
		MineSweeperCell
	}
}
