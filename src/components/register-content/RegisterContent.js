import request from 'superagent';
import Base from '../../services/base';

const methods = {
	signUp(name, email, password) {
		request
		.post(Base.BASE_ENDPOINTS + '/users/')
		.query({name: name, email: email, password: password})
		.end((err, res) => {
        	// callback(err, res);
        	console.log(res.body);
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
