<template>
  <div class="project-row">
    <div class="project-left">
      <div class="project-button" />
      <div class="project-name">
        {{ document.id }}
      </div>
    </div>
    <div class="project-right">
      <img src="@/assets/right-angle-bracket.svg" class="right-bracket" height="17" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'document-row',
  props: {
    document: Object,
  }
}
</script>

<style scoped>
@import './project.css';
</style>