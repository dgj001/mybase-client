<template>
  <div 
    class="project-row"
    :class="{ 'project-selected': selected }"
    @click="handleClick"
  >
    <div class="project-left">
      <div class="project-button" />
      <div class="project-name" :class="{ 'project-bold': selected }">
        {{ document.id }}
      </div>
    </div>
    <div class="project-right">
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
  name: 'document-row',
  props: {
    document: Object,
  },
  computed: {
    ...mapGetters('documentList', {
      selectedId: 'getSelectedId',
    }),
    selected() {
      return this.document._id === this.selectedId;
    },
  },
  methods: {
    ...mapActions('documentList', {
      selectDocument: 'select',
    }),
    handleClick() {
      this.selectDocument({ documentId: this.document._id });
    },
  },
}
</script>

<style scoped>
.project-visible {
  visibility: visible;
}
.project-hidden {
  visibility: hidden;
}
</style>