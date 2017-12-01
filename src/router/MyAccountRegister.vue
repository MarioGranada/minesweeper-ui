<template lang="jade">
  .ph-xs.bg-color-light.padded-container.tablet-padding
    .title-font.text-center.fs-24.main-color-text.col-xs.mt-m.mb-xs
      | Let's get you ready to shop
    .col-xs-12.text-center.mb-m
      | Please provide some basic information so that you can get started with your shop
    register-content
</template>

<script>
  import RegisterContent from '../components/register-content/RegisterContent.vue';

  export default {
    components: {
      RegisterContent
    }
  };

</script>
