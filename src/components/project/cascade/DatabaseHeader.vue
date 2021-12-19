<template>  
  <div 
    class="db-header-row" 
    :class="{ 
      'db-upper-left-corner': isFirstChild,
      'db-right-border': !isLastChild 
    }"
  >
    <div class="db-icon-and-text">
      <v-icon>mdi-rhombus-split</v-icon>
      {{ project ? project.target : '' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'project-header',
  props: {
    isFirstChild: {
      type: Boolean,
      default: false,
    },
    isLastChild: {
      type: Boolean,
      default: true,
    },
    project: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped>
</style>