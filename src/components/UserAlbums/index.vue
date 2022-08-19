<script>
import SingleAlbum from '@/components/SingleAlbum';

export default {
	name: 'UserAlbums',
	props: {
		userId: {
			type: String,
		},
		userName: {
			type: String,
		},
	},
	components: { SingleAlbum },
	computed: {
		usersAlbumsFetchStatus() {
			return this.$store.getters.getUserAlbumsFetchStatus;
		},
		userAlbums() {
			return this.$store.getters.getUserAlbums;
		},
	},
	async mounted() {
		await this.$store.dispatch('fetchUserAlbums', this.userId);
	},
};
</script>

<template>
	<div id="UserAlbums">
		<div class="preloader" v-if="usersAlbumsFetchStatus === 'pending'">
			Загрузка...
		</div>
		<div class="error" v-if="usersAlbumsFetchStatus === 'error'">
			Произошла ошибка! Возможно пользователь еще ничего не писал!
		</div>
		<div class="albumsWrapper" v-if="usersAlbumsFetchStatus === 'success'">
			<SingleAlbum
				v-for="album in userAlbums"
				v-bind:key="album.id"
				:album="album"
				:userName="userName" />
		</div>
	</div>
</template>

<style lang="scss">
@import './index.scss';
</style>
