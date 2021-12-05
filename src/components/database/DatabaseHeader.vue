<template>  
  <div class="header-row" :class="{ 'right-border': !isLastChild }">
    
  </div>
</template>

<script>
export default {
  name: 'project-header',
  props: {
    isLastChild: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style scoped>

</style>