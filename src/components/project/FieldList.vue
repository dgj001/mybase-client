<template>
  <div>
    <div class="row add-row">
      <div class="button-column">        
        <img src="@/assets/plus.svg" class="plus-button" height="24"/>
      </div>
      <div class="value-column">
        Add Field
      </div>
    </div>
    <div
      v-for="field of fields"
      :key="field._id"
      class="row"
    >
      <div class="button-column"></div>
      <div class="name-column">
        {{ field.name }}:
      </div>
      <div class="value-column">
        "{{ field.value }}"
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'field-list',
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
  }
}
</script>

<style scoped>
.row {
  display: flex;
  padding: 10px 10px 10px 0;
  /* border: 1px solid darkgray; */
}
.button-column {
  display: flex;
  min-width: 32px;
  align-items: center;
  justify-content: space-around;
}
.name-column {
  font-family: 'Courier New', Courier, monospace;
  padding-right: 10px;
}
.value-column {
  font-size: 1rem;
}
.plus-button {
  cursor: pointer;
}
.add-row {
  color: #1a73ed;
  cursor: pointer;
}
.add-row:hover {
  background-color: #f2f7fe;
}
.add-row:active {
  background-color: #edf4fd;
}
</style>