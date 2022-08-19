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
		currIndexArr() {
			return [
				this.calculateIndex(-2),
				this.calculateIndex(-1),
				this.currImageIndex,
				this.calculateIndex(1),
				this.calculateIndex(2),
			];
		},
	},

	methods: {
		calculateIndex(difference) {
			const newIndex = this.currImageIndex + difference;
			if (newIndex < 0) {
				return this.maxIndex - -newIndex + 1;
			}
			if (newIndex > this.maxIndex) {
				return 0 + newIndex - this.maxIndex - 1;
			}

			return newIndex;
		},
		setCurrImageIndex(index) {
			this.currImageIndex = index;
		},
		next() {
			this.currImageIndex = this.currIndexArr[3];
		},
		previous() {
			this.currImageIndex = this.currIndexArr[1];
		},
	},
};
</script>

<template>
	<div id="PhotoSlider" class="photoSlider">
		<span class="photoSlider__arrows" @click="previous">&#x3c;</span>
		<img
			:src="photos[currIndexArr[0]].url"
			alt=""
			class="photoSlider__sideImage"
			@click="setCurrImageIndex.call({}, currIndexArr[0])" />
		<img
			:src="photos[currIndexArr[1]].url"
			alt=""
			class="photoSlider__sideImage"
			@click="setCurrImageIndex.call({}, currIndexArr[1])" />
		<span>
			<img
				:src="photos[currIndexArr[2]].url"
				alt=""
				class="photoSlider___centralImage" />
			<p>{{ currIndexArr[2] + 1 }}: {{ photos[currImageIndex].title }}</p>
		</span>
		<img
			:src="photos[currIndexArr[3]].url"
			alt=""
			class="photoSlider__sideImage"
			@click="setCurrImageIndex.call({}, currIndexArr[3])" />
		<img
			:src="photos[currIndexArr[4]].url"
			alt=""
			class="photoSlider__sideImage"
			@click="setCurrImageIndex.call({}, currIndexArr[4])" />

		<span class="photoSlider__arrows" @click="next">&#x3e;</span>
	</div>
</template>

<style lang="scss">
@import './index.scss';
</style>
