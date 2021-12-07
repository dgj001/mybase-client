<template>
  <div class="project-add-row" @mousedown="saveCoords" @click="handleClick">
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
  },
  data() {
    return {
      coords: {
        x: 0,
        y: 0,
      },
    };
  },
  methods: {
    handleClick() {
      this.$emit('click', this.coords);
    },
    saveCoords(e) {
      this.coords = {
        x: e.clientX,
        y: e.clientY,
      };
    },
  },
}
</script>

<style scoped>
</style>