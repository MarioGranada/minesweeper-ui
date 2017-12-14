import request from 'superagent';
import Base from '../../services/base';

const methods = {
	createGame() {
		request
		.post(Base.BASE_ENDPOINTS + '/users/' + this.userId + '/games')
		.query({rows: this.rows, cols: this.cols, mines_total: this.mines})
		.end((err, res) => {
			this.$router.push({path: '/my-account/games/' +  res.body._id.$oid});
    	});
	}
}

const data = function () {
	return {
		rows: '',
		cols: '',
		mines: ''
	}
}

const props = {
	userId: {type: String}
}

export default {
	props,
	methods,
	data
}
