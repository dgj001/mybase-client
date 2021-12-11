<template>
  <v-app-bar app flat clipped-left color="primary" height="48px">
    <v-img 
      src="@/assets/logo.svg"
      class="logo"
      max-height="100%"
      max-width="48px"
    />
    <v-spacer />
  </v-app-bar>
</template>

<script>
export default {
  name: 'top-bar',
}
</script>

<style scoped>
.logo {
  margin-left: 0px;
}
</style>