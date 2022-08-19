<script>
import SinglePost from '@/components/SinglePost';

export default {
	name: 'UserPosts',
	props: {
		userId: {
			type: String,
		},
		userName: {
			type: String,
		},
	},
	components: { SinglePost },
	computed: {
		usersPostsFetchStatus() {
			return this.$store.getters.getUserPostsFetchStatus;
		},
		userPosts() {
			return this.$store.getters.getUserPosts;
		},
	},
	async mounted() {
		await this.$store.dispatch('fetchUserPosts', this.userId);
	},
};
</script>

<template>
	<div id="UserPosts">
		<div class="preloader" v-if="usersPostsFetchStatus === 'pending'">
			Загрузка...
		</div>
		<div class="error" v-if="usersPostsFetchStatus === 'error'">
			Произошла ошибка! Возможно пользователь еще ничего не писал!
		</div>
		<div class="postsWrapper" v-if="usersPostsFetchStatus === 'success'">
			<SinglePost
				v-for="post in userPosts"
				v-bind:key="post.id"
				:post="post"
				:userName="userName" />
		</div>
	</div>
</template>

<style lang="scss">
@import './index.scss';
</style>
