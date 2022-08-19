import Vue from 'vue';
import Vuex from 'vuex';

import users from './users';
import profile from './profile';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		users,
		profile,
	},
});

export default store;
