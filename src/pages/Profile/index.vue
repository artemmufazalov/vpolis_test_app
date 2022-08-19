<script>
import UserAvatar from '@/components/UserAvatar';
import ProfileNav from '@/components/ProfileNav';
import UserAlbums from '@/components/UserAlbums';
import UserPosts from '@/components/UserPosts';

export default {
	name: 'UserProfile',
	components: { UserAvatar, ProfileNav, UserAlbums, UserPosts },
	computed: {
		userId() {
			return this.$route.params.id;
		},
		route() {
			return `/users/${this.userId}`;
		},
		openedSection() {
			const queryOpen = this.$route.query.open;
			if (!queryOpen || queryOpen === '') {
				return 'posts';
			}
			return queryOpen;
		},
		userDataFetchStatus() {
			return this.$store.getters.getUserDataFetchStatus;
		},
		userData() {
			return this.$store.getters.getUserData;
		},
	},
	async mounted() {
		await this.$store.dispatch('fetchUserData', this.userId);
	},
	watch: {
		async route() {
			this.$store.dispatch('fetchUserData', this.userId);
		},
	},
};
</script>

<template>
	<div id="UserProfile">
		<div class="preloader" v-if="userDataFetchStatus === 'pending'">
			Загрузка...
		</div>
		<div class="error" v-if="userDataFetchStatus === 'error'">
			Произошла ошибка! Возможно пользователя с id {{ userId }} не
			существует!
		</div>
		<div class="profile" v-if="userDataFetchStatus === 'success'">
			<div class="profile__linkToUsers">
				<router-link to="/">Ко всем пользователям</router-link>
			</div>
			<div class="profile__top">
				<span class="profile__top__avatar">
					<UserAvatar
						:name="userData.username"
						:width="150"
						:height="150"
						:fontSize="64" />
				</span>
				<span class="profile__top__description">
					<div>
						<span>Имя: </span>
						<span>{{ userData.username }}</span>
					</div>
					<div>
						<span>Телефон: </span>
						<span>{{ userData.phone }}</span>
					</div>
					<div>
						<span>Email: </span>
						<span>{{ userData.email }}</span>
					</div>
					<div>
						<span>Веб-сайт: </span>
						<span>{{ userData.website }}</span>
					</div>
					<div>
						<span>Компания: </span>
						<span>{{ userData.company.name }}</span>
					</div>
				</span>
			</div>
			<div class="profile__bottom">
				<ProfileNav :route="route" :selected="openedSection" />
				<div class="profile__bottom__contentWrapper">
					<div v-if="openedSection === 'posts'">
						<UserPosts
							:userId="userId"
							:userName="userData.username" />
					</div>
					<div v-if="openedSection === 'albums'">
						<UserAlbums :userId="userId" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import './index.scss';
</style>
