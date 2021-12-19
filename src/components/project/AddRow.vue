<template>
  <div class="db-add-row" @mousedown="saveCoords" @click="handleClick">
    <div class="db-left-col">
      <div class="db-button">
        <img src="@/assets/plus.svg" height="24"/>
      </div>
      <div>
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