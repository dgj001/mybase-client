<template>
  <div class="header-row">
    {{ document.id }}
  </div>
</template>

<script>
export default {
  name: 'document-header',
  props: {
    document: Object,
  }
}
</script>

<style scoped>
@import './project.css'
</style>