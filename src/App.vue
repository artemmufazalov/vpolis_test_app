<template>
	<div id="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
export default {
	name: 'App',
	components: {},
};
</script>

<style lang="scss">
@import './App.scss';
</style>
