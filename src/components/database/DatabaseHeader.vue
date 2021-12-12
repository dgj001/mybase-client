<template>  
  <div 
    class="header-row" 
    :class="{ 
      'upper-left-corner': isFirstChild,
      'right-border': !isLastChild 
    }"
  >
    <div class="icon-and-text">
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
.upper-left-corner {
  border-top-left-radius: 6px;
}

</style>