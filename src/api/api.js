import instance from './baseInstance';

const appApi = {
	getUsers: () => {
		return instance.get('/users');
	},
	getUserDataById: (id) => {
		return instance.get(`/users?id=${id}`);
	},
	getUserPostsByUserId: (id) => {
		return instance.get(`/posts?userId=${id}`);
	},
	getUserAlbumsByUserId: (id) => {
		return instance.get(`/albums?userId=${id}`);
	},
	getPhotosByAlbumId: (id) => {
		return instance.get(`/albums?albumId=${id}`);
	},
    
};


export default appApi;
