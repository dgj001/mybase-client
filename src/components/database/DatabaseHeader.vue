<template>  
  <div 
    class="header-row" 
    :class="{ 
      'upper-left-corner': isFirstChild,
      'right-border': !isLastChild 
    }">
    
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
  },
}
</script>

<style scoped>
.upper-left-corner {
  border-top-left-radius: 6px;
}

</style>