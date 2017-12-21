import request from 'superagent';
import Base from '../../services/base';

const methods = {
	signIn() {
		request
		.get(Base.BASE_ENDPOINTS + '/user_by_email/')
		.query({email: this.email})
		.end((err, res) => {
			this.$router.push({path: '/my-account/' + res.body._id.$oid});
    	});
	},
	signUp() {
		this.$router.push({path: '/register/'});
	},
	beforeSubmit() {
		this.$validator.validateAll().then((result) => {
			if (result) {
				this.signIn();
			}
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
