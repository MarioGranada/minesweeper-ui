import request from 'superagent';
import Base from '../../services/base';

const methods = {
	signIn(email) {
		request
		.get(Base.BASE_ENDPOINTS + '/user_by_email/')
		.query({email: email})
		.end((err, res) => {
			console.log(res.body);
			this.$router.push({path: '/my-account/'+res.body._id.$oid});
    	});
	}
}

const data = function () {
	return {
		email: '',
		password: ''
	}
}

export default {
	methods,
	data
}
