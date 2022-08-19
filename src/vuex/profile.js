import appApi from '@/api/api';

const profile = {
	state: () => ({
		userData: {},
		posts: [],
		albums: [],
		albumsPhotos: {},
		userDataFetchStatus: 'pending',
		userPostsFetchStatus: 'pending',
		userAlbumsFetchStatus: 'pending',
	}),
	mutations: {
		setUserData(state, userData) {
			state.userData = userData;
		},
		setUserPosts(state, posts) {
			state.posts = posts;
		},
		setUserAlbums(state, albums) {
			state.albums = albums;
		},
		setSingleAlbumPhotos(state, { id, albumsPhotos }) {
			state.albumsPhotos[id].albums = albumsPhotos;
		},
		setUserDataFetchStatus(state, newStatus) {
			state.userDataFetchStatus = newStatus;
		},
		setUserPostsFetchStatus(state, newStatus) {
			state.userDataFetchStatus = newStatus;
		},
		setUserAlbumsFetchStatus(state, newStatus) {
			state.userDataFetchStatus = newStatus;
		},
		setAlbumPhotosFetchStatus(state, { id, newStatus }) {
			state.albumsPhotos[id].fetchStatus = newStatus;
		},
	},
	actions: {
		async fetchUserData({ commit }, id) {
			commit('setUserDataFetchStatus', 'pending');
			try {
				const responseData = await appApi.getUserDataById(id);
				commit('setUserDataFetchStatus', 'success');
				commit('setUserData', responseData.data);
			} catch (err) {
				commit('setUserDataFetchStatus', 'error');
			}
		},
		async fetchUserPosts({ commit }, id) {
			commit('setUserPostsFetchStatus', 'pending');
			try {
				const responseData = await appApi.getUserPostsByUserId(id);
				commit('setUserPostsFetchStatus', 'success');
				commit('setUserPosts', responseData.data);
			} catch (err) {
				commit('setUserPostsFetchStatus', 'error');
			}
		},
		async fetchUserAlbums({ commit }, id) {
			commit('setUserAlbumsFetchStatus', 'pending');
			try {
				const responseData = await appApi.getUserAlbumsByUserId(id);
				commit('setUserAlbumsFetchStatus', 'success');
				commit('setUserAlbums', responseData.data);
			} catch (err) {
				commit('setUserAlbumsFetchStatus', 'error');
			}
		},
		async fetchAlbumPhotos({ commit }, id) {
			commit('setAlbumPhotosFetchStatus', { id, newStatus: 'pending' });
			try {
				const responseData = await appApi.getPhotosByAlbumId(id);
				commit('setAlbumPhotosFetchStatus', {
					id,
					newStatus: 'success',
				});
				commit('setSingleAlbumPhotos', {
					id,
					albumsPhotos: responseData.data,
				});
			} catch (err) {
				commit('setAlbumPhotosFetchStatus', { id, newStatus: 'error' });
			}
		},
	},
	getters: {
		getUserData: (state) => {
			return state.userData;
		},
		getUserPosts: (state) => {
			return state.posts;
		},
		getUserAlbums: (state) => {
			return state.albums;
		},
		getUserDataFetchStatus: (state) => {
			return state.userDataFetchStatus;
		},
		getUserPostsFetchStatus: (state) => {
			return state.userPostsFetchStatus;
		},
		getUserAlbumsFetchStatus: (state) => {
			return state.userAlbumsFetchStatus;
		},
		getAlbumsPhotosById: (state) => (id) => {
			return state.albumsPhotos[id].albumsPhotos;
		},
		getAlbumsPhotosFetchStatusById: (state) => (id) => {
			return state.albumsPhotos[id].status;
		},
	},
};

export default profile;
