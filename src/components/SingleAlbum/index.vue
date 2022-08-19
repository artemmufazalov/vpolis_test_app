<script>
import PhotoSlider from '@/components/PhotosSlider';

export default {
	name: 'SingleAlbum',
	props: {
		album: {
			type: Object,
		},
	},
	components: { PhotoSlider },
	computed: {
		albumPhotos() {
			return this.$store.getters.getAlbumsPhotosById(this.album.id);
		},
		albumFetchStatus() {
			return this.$store.getters.getAlbumsPhotosFetchStatusById(
				this.album.id
			);
		},
	},
	async mounted() {
		await this.$store.dispatch('fetchAlbumPhotos', this.album.id);
	},
};
</script>

<template>
	<div id="SingleAlbum" class="singleAlbum">
		<div class="singleAlbum__title">Альбом: {{ album.title }}</div>
		<div class="singleAlbum__photosWrapper">
			<div
				class="singleAlbum__photosPreloader"
				v-if="albumFetchStatus === 'pending'"
			>
				Загрузка...
			</div>
			<div v-if="albumFetchStatus === 'success'">
				<PhotoSlider :photos="albumPhotos" />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import './index.scss';
</style>
