import Vue from 'vue';
import Router from 'vue-router';

import Profile from '../pages/Profile';
import Users from '../pages/Users';

Vue.use(Router);

let router = new Router({
	routes: [
		{
			path: '/',
			component: Users,
		},
		{
			path: '/users/:id',
			component: Profile,
		},
	],
});

export default router;
