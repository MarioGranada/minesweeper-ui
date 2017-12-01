import Vue from 'vue'
import Router from 'vue-router'
import MyAccountLogin from './MyAccountLogin.vue'
import MyAccountRegister from './MyAccountRegister'
import MyAccountProfile from './MyAccountProfile'
import MYAccountInGame from './MYAccountInGame'

Vue.use(Router)

const account = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		component: MyAccountLogin,
		title: 'Login'
	},
	{
		path: '/register',
		component: MyAccountRegister,
		title: 'Register'
	},
	{
		path: '/my-account',
		component: MyAccountProfile,
		title: 'My Profile'
	},
	{
		path: '/my-account/games/:game_id',
		component: MYAccountInGame,
		title: 'Current Game'
	}
];

const router = new Router({
	routes: account
});

export default router;
