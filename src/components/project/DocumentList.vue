<template>
  <div class="container">
    <div class="row add-row">
      <div class="button-column">        
        <img src="@/assets/plus.svg" class="plus-button" height="24"/>
      </div>
      <div class="value-column">
        Add document
      </div>
    </div>
    <div
      v-for="document of documents"
      :key="document._id"
      class="row"
    >
      <div class="button-column"></div>
      <div class="name-column">
        {{ document.id }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'document-list',
  props: {
    documents: {
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
  cursor: pointer;
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
.row:hover {
  background-color: #ebebeb;
}
</style>