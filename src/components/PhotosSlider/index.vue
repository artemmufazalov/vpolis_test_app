<script>
export default {
	name: 'PhotoSlider',
	props: {
		photos: {
			type: Array,
		},
	},
	data() {
		return {
			currImageIndex: 0,
		};
	},
	computed: {
		maxIndex() {
			return this.photos.length - 1;
		},
		nextImageIndex() {
			const newIndex = this.currImageIndex + 1;
			if (newIndex > this.maxIndex) {
				return 0;
			}
			return newIndex;
		},
		previosImageIndex() {
			const newIndex = this.currImageIndex - 1;
			if (newIndex < 0) {
				return this.maxIndex;
			}
			return newIndex;
		},
	},

	methods: {
		next() {
			this.currImageIndex = this.nextImageIndex;
		},
		previous() {
			this.currImageIndex = this.previosImageIndex;
		},
	},
};
</script>

<template>
	<div id="PhotoSlider" class="photoSlider">
		<span class="photoSlider__arrows" @click="previous">&#x3c;</span>
		<img
			:src="photos[previosImageIndex].url"
			alt=""
			class="photoSlider__sideImage"
			@click="previous"
		/>
		<span>
			<img
				:src="photos[currImageIndex].url"
				alt=""
				class="photoSlider___secondImage"
			/>
			<p>{{ photos[currImageIndex].title }}</p>
		</span>
		<img
			:src="photos[nextImageIndex].url"
			alt=""
			class="photoSlider__sideImage"
			@click="next"
		/>
		<span class="photoSlider__arrows" @click="next">&#x3e;</span>
	</div>
</template>

<style lang="scss">
@import './index.scss';
</style>
