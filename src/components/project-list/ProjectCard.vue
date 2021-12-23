<template>
  <v-card
    class="mb-5"
    elevation="4"
    width="300px"
    height="210px"
    @click="open"
  >
    <v-card-title>{{ project.name }}</v-card-title>
    <v-card-text>
      {{ project.target }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'project-card',
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  methods: {
    open() {
      this.$router.push({ 
        path: `projects/${this.project._id}/cascade`
      });
    },
  },
}
</script>

<style scoped>

</style>