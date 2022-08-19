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
		reset(state) {
			state.userData = {};
			state.posts = [];
			state.albums = [];
			state.albumsPhotos = {};
			state.userDataFetchStatus = 'pending';
			state.userPostsFetchStatus = 'pending';
			state.userAlbumsFetchStatus = 'pending';
		},
		setUserData(state, userData) {
			state.userData = userData;
			state.posts = [];
			state.albums = [];
			state.albumsPhotos = {};
			state.userPostsFetchStatus = 'pending';
			state.userAlbumsFetchStatus = 'pending';
		},
		setUserPosts(state, posts) {
			state.posts = posts;
		},
		setUserAlbums(state, albums) {
			state.albums = albums;

			albums.forEach((alb) => {
				if (!Object.keys(state.albumsPhotos).includes(alb.id)) {
					state.albumsPhotos[alb.id] = {
						fetchStatus: 'pending',
						albums: [],
					};
				}
			});
		},
		setUserDataFetchStatus(state, newStatus) {
			state.userDataFetchStatus = newStatus;
		},
		setUserPostsFetchStatus(state, newStatus) {
			state.userPostsFetchStatus = newStatus;
		},
		setUserAlbumsFetchStatus(state, newStatus) {
			state.userAlbumsFetchStatus = newStatus;
		},
		setSingleAlbumPhotos(state, { id, albumsPhotos }) {
			const newAlbumPhotosState = {
				...state.albumsPhotos,
				[id]: { ...state.albumsPhotos[id], photos: [...albumsPhotos] },
			};
			state.albumsPhotos = newAlbumPhotosState;
		},
		setSingleAlbumPhotosFetchStatus(state, { id, newStatus }) {
			const newAlbumPhotosState = {
				...state.albumsPhotos,
				[id]: { ...state.albumsPhotos[id], fetchStatus: newStatus },
			};
			state.albumsPhotos = newAlbumPhotosState;
		},
	},
	actions: {
		async fetchUserData({ commit }, id) {
			commit('reset');
			commit('setUserDataFetchStatus', 'pending');
			try {
				const responseData = await appApi.getUserDataById(id);
				commit('setUserDataFetchStatus', 'success');
				commit('setUserData', responseData.data[0]);
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
			commit('setSingleAlbumPhotosFetchStatus', {
				id,
				newStatus: 'pending',
			});
			try {
				const responseData = await appApi.getPhotosByAlbumId(id);
				commit('setSingleAlbumPhotosFetchStatus', {
					id,
					newStatus: 'success',
				});
				commit('setSingleAlbumPhotos', {
					id,
					albumsPhotos: responseData.data,
				});
			} catch (err) {
				commit('setSingleAlbumPhotosFetchStatus', {
					id,
					newStatus: 'error',
				});
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
			if (!Object.keys(state.albumsPhotos).includes(String(id))) {
				return [];
			}
			return state.albumsPhotos[id].photos;
		},
		getAlbumsPhotosFetchStatusById: (state) => (id) => {
			if (!Object.keys(state.albumsPhotos).includes(String(id))) {
				return 'pending';
			}
			return state.albumsPhotos[id].fetchStatus;
		},
	},
};

export default profile;
