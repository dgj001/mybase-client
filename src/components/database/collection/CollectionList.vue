<template>
  <div class="collection-list" :class="{ 'db-right-border': !isLastChild }">
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
      :projectId="project ? project._id : null"
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
    project: {
      type: Object,
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
      selectCollection: 'select',
    }),
    addCollection() {
      this.showAddCol = true;
    },
    async saveCollection(params) {
      this.showAddCol = false;
      await this.createCollection({
        projectId: this.project._id,
        ...params
      });
      this.selectCollection({ last: true });
    },
  },
}
</script>

<style scoped>

</style>