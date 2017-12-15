<template lang="jade">
#app
	.main-container.col-xs-12
		header.col-xs-12.center-xs
			img(src='../assets/logo.png')
		.padded-container.center-xs.col-xs-12.col-md-10
			router-view
</template>

<script>
export default {
  name: 'app'
}
</script>
