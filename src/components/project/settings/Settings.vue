<template>
  <div>tbd</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'settings',  
  mounted() {
    const projectId = this.$route.params.id;
    this.selectProject({ projectId });
  },
  methods: {
    ...mapActions('projectList', {
      selectProject: 'select',
    }),
  }
}
</script>

<style scoped>

</style>