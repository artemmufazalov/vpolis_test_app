<script>
import UserCard from '@/components/UserCard';

export default {
	name: 'AllUsers',
	computed: {
		usersFetchStatus() {
			return this.$store.getters.getUsersFetchStatus;
		},
		users() {
			return this.$store.getters.getUsers;
		},
	},
	data() {
		return {};
	},
	components: { UserCard },
	async mounted() {
		await this.$store.dispatch('fetchUsers');
	},
};
</script>

<template>
	<div id="AllUsers" class="usersPage">
		<div v-if="usersFetchStatus === 'pending'">Загрузка...</div>
		<div v-if="usersFetchStatus === 'success'" class="usersPage__content">
			<h1 class="usersPage__title">Список пользователей</h1>
			<div class="usersPage__wrapper">
				<UserCard
					v-for="user in users"
					:key="user.id"
					:userData="user"
				/>
			</div>
		</div>
		<div v-if="usersFetchStatus === 'error'">
			Произошла ошибка! Попробуйте обновить страницу или вернуться позже!
		</div>
	</div>
</template>

<style lang=scss>
@import './index.scss';
</style>
