<template>
  <div class="db-header-row" :class="{ 'db-right-border': !isLastChild }">
    <div class="db-icon-and-text">
      <v-icon>mdi-file-document-multiple-outline</v-icon>
      <span>{{ collectionName }}</span>
    </div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item dense @click="showConfirm = true">
          Delete collection
        </v-list-item>
      </v-list>
    </v-menu>
    <confirm-dialog 
      :show="showConfirm"
      title="Delete collection?"
      :message="`Delete collection ${this.collectionName} and all of its documents?`"
      @confirm="confirmRemove"
      @cancel="showConfirm = false"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import ConfirmDialog from '../ConfirmDialog';

export default {
  name: 'collection-header',
  components: {
    ConfirmDialog,
  },
  props: {
    collection: Object,
    isLastChild: Boolean,
  },
  data() {
    return {
      showConfirm: false,
    };
  },
  computed: {
    collectionName() {
      return this.collection ? this.collection.name : null;
    },
  },
  methods: {
    ...mapActions('collectionList', {
      deleteCollection: 'delete',
      selectCollection: 'select',
    }),
    confirmRemove() {
      this.showConfirm = false;
      this.deleteCollection(this.collection._id);
      this.selectCollection({ first: true });
    },
  },
}
</script>

<style scoped>

</style>