<template>
  <div 
    class="db-row"
    :class="{ 'db-selected': selected }"
    @click="handleClick"
  >
    <div class="db-left-col">
      <div class="db-button" />
      <div class="db-name" :class="{ 'db-bold': selected }">
        {{ collection.name }}
      </div>
    </div>
    <div>
      <img 
        src="@/assets/right-angle-bracket.svg" 
        class="right-bracket"
        :style="{ visibility: selected ? 'visible' : 'hidden'}"
        height="17" 
      />
    </div>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'collection-row',
  props: {
    collection: Object,
  },
  computed: {
    ...mapGetters('collectionList', {
      selectedId: 'getSelectedId',
    }),
    selected() {
      return this.collection._id === this.selectedId;
    },
  },
  methods: {
    ...mapActions('collectionList', {
      selectCollection: 'select',
    }),
    handleClick() {
      this.selectCollection({ collectionId: this.collection._id });
    },
  },
}
</script>

<style scoped>

</style>