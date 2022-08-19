import appApi from '@/api/api';

const users = {
	state: () => ({
		users: [],
		usersFetchStatus: 'pending',
	}),
	mutations: {
		setUsers(state, users) {
			state.users = users;
		},
		setUsersFetchStatus(state, newStatus) {
			state.usersFetchStatus = newStatus;
		},
	},
	actions: {
		async fetchUsers({ commit }) {
			commit('setUsersFetchStatus', 'pending');
			try {
				const responseData = await appApi.getUsers();
				commit('setUsersFetchStatus', 'success');
				commit('setUsers', responseData.data);
			} catch (err) {
				commit('setUsersFetchStatus', 'error');
			}
		},
	},
	getters: {
		getUsers(state) {
			return state.users;
		},
		getUsersFetchStatus(state) {
			return state.usersFetchStatus;
		},
	},
};

export default users;
