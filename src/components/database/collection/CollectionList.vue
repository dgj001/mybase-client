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
    <add-collection-dialog
      :show="showAddCol"
      :projectId="projectId"
      @save="saveCollection"
      @cancel="showAddCol = false;"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import AddCollectionDialog from './AddCollectionDialog';
import AddRow from '../AddRow';
import CollectionRow from './CollectionRow';

export default {
  name: 'collection-list',
  components: {
    AddCollectionDialog,
    AddRow,
    CollectionRow,
  },
  props: {
    projectId: {
      type: String,
      default: null,
    },
    collections: {
      type: Array,
      default: () => [],
    },
    isLastChild: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showAddCol: false,
    }
  },
  methods: {
    ...mapActions('collectionList', {
      createCollection: 'create',
    }),
    addCollection() {
      this.showAddCol = true;
    },
    saveCollection(params) {
      this.createCollection({
        projectId: this.projectId,
        ...params
      });
      this.showAddCol = false;
    },
  },
}
</script>

<style scoped>

</style>