<template lang="jade">
	.bg-color-light
		.mh-xs.tablet-padding.tablet-m-0
			section.padded-container.subheader-box
				.row.mv-m
					.title-font.text-center.fs-24.col-xs
						| Log in to your account
			.padded-container.mb-s
				login-content
</template>

<script>
  import LoginContent from '../components/login-content/LoginContent.vue';

  export default {
    components: {
      LoginContent
    }
  }
</script>
