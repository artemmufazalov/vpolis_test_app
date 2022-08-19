<script>
import UserAvatar from '@/components/UserAvatar';

export default {
	name: 'UserProfile',
	components: { UserAvatar },
};
</script>

<template>
	<div id="UserProfile" class="profile">
		<div class="profile__top">
			<span class="profile__top__avatar">
				<UserAvatar />
			</span>
			<span class="profile__top__description">
				
			</span>
		</div>
		<div class="profile__bottom">
			<div class="profile__bottom__nav"></div>
			<div class="profile__bottom__contentWrapper"></div>
		</div>
	</div>
</template>

<style lang="scss">
@import './Profile.scss';
</style>
