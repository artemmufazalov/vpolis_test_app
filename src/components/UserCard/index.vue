<script>
import UserAvatar from '@/components/UserAvatar';

export default {
	name: 'UserCard',
	props: {
		userData: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	computed: {
		route() {
			return `/users/${this.userData.id}`;
		},
	},
	components: { UserAvatar },
};
</script>

<template>
	<router-link :to="route">
		<span id="UserCard">
			<UserAvatar :name="userData.username" :height="150" :width="150" />
			<span class="userName">{{ userData.username }}</span>
		</span>
	</router-link>
</template>

<style lang="scss">
@import './index.scss';
</style>
