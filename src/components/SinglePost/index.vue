<script>
export default {
	name: 'SinglePost',
	props: {
		userName: {
			type: String,
		},
		post: {
			type: Object,
		},
	},
};
</script>

<template>
	<div id="SinglePost" class="singlePost">
		<div class="singlePost__title">
			<span>{{ userName }}: </span>
			<span>{{ post.title }}</span>
		</div>
		<div class="singlePost__content">{{ post.body }}</div>
	</div>
</template>

<style lang="scss">
@import './index.scss';
</style>
