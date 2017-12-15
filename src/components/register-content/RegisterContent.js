import request from 'superagent';
import Base from '../../services/base';

const methods = {
	signUp() {
		request
		.post(Base.BASE_ENDPOINTS + '/users/')
		.query({name: this.name, email: this.email, password: this.password})
		.end((err, res) => {
			if (err) {
				this.error = err.toString();
			} else {
				this.$router.push({path: '/my-account/' + res.body._id.$oid});
			}
    	});
	}
}

const data = function () {
	return {
		email: '',
		password: '',
		name: ''
	}
}

export default {
	methods,
	data
}
