import request from 'superagent'
import Base from '../../services/base'

const  methods = {
	signIn(email) {
		request
		.get(Base.BASE_ENDPOINTS + '/user_by_email/')
		// .query({email: 'mandres190@hotmail.com'})
		.query({email: email})
		.end((err, res) => {
        	// callback(err, res);
        	console.log(res);
    	});
	}
}

export default {
	methods
}
