<script>
import { stringToColour } from '@/helpers';

export default {
	name: 'UserAvatar',
	props: {
		height: {
			type: Number,
			default: 100,
		},
		width: {
			type: Number,
			default: 100,
		},
		name: {
			type: String,
			default: 'U',
		},
		fontSize: {
			type: Number,
			default: 50,
		},
	},
	computed: {
		nameFirstLetter() {
			return this.name[0];
		},
		avatarStyle() {
			return {
				height: `${this.height}px`,
				width: `${this.width}px`,
				'font-size': `${this.fontSize}px`,
				'background-color': stringToColour(this.name),
			};
		},
	},

	components: {},
};
</script>

<template>
	<span id="UserAvatar" :style="avatarStyle">
		<span>{{ nameFirstLetter }}</span>
	</span>
</template>

<style lang="scss">
@import './index.scss';
</style>
