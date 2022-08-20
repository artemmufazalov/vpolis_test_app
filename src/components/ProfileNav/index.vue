<script>
export default {
	name: 'ProfileNav',
	props: {
		selected: {
			type: String,
			default: 'posts',
		},
		route: {
			type: String,
		},
	},
};
</script>

<template>
	<div id="ProfileNav" class="profile__nav">
		<router-link
			:to="route + '?page=posts'"
			:class="selected === 'posts' ? 'selected' : ''">
			<span>Посты</span>
		</router-link>
		<router-link
			:to="route + '?page=albums'"
			:class="selected === 'albums' ? 'selected' : ''">
			<span>Альбомы</span>
		</router-link>
	</div>
</template>

<style lang="scss">
@import './index.scss';
</style>
