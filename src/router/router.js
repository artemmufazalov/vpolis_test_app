import Vue from 'vue';
import Router from 'vue-router';

import ProfilePage from '@/pages/Profile';
import UsersPage from '@/pages/Users';

Vue.use(Router);

let router = new Router({
	routes: [
		{
			path: '/',
			component: UsersPage,
		},
		{
			path: '/users/:id',
			component: ProfilePage,
		},
	],
});

export default router;
