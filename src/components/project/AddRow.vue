<template>
  <div class="project-row project-add-row">
    <div class="project-left">
      <div class="project-button">
        <img src="@/assets/plus.svg" class="project-plus" height="24"/>
      </div>
      <div class="project-value">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'add-row',
  props: {
    label: String,
  }
}
</script>

<style scoped>
@import './project.css'
</style>