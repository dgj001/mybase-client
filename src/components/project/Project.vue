<template>
  <div class="container">
    <field-list :fields="fields"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FieldList from './FieldList';

export default {
  name: 'project',
  components: { 
    FieldList 
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('fieldList', {
      fields: 'getList'
    }),
  },
  mounted() {
    const projectId = this.$route.params.id;
    this.fetchFields(projectId);
  },
  methods: {
    ...mapActions('fieldList', {
      fetchFields: 'fetch',
    }),
  }
}
</script>

<style scoped>
.container {
  /* border: */
  box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.15);
  border-radius: 6px;
}
</style>