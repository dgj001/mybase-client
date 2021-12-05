<template>
  <div class="collection-list" :class="{ 'right-border': !isLastChild }">
    <add-row 
      label="Start collection" 
      @click="addCollection"
    />
    <collection-row 
      v-for="collection of collections"
      :key="collection._id"
      :collection="collection"
    />
  </div>
</template>

<script>
import AddRow from './AddRow';
import CollectionRow from './CollectionRow';

export default {
  name: 'collection-list',
  components: {
    AddRow,
    CollectionRow,
  },
  props: {
    collections: {
      type: Array,
      default: () => [],
    },
    isLastChild: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    addCollection() {
      this.$emit('add');
    },
  },
}
</script>

<style scoped>

</style>