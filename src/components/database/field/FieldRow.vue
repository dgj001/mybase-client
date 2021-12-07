<template>
  <div 
    class="project-row field-row" 
    @mouseover="hovering = true" 
    @mouseleave="hovering = false"
  >
    <div class="project-left">
      <div class="project-button" />
      <div class="project-name">
        {{ field.name }}:
      </div>
      <div class="project-value">
        "{{ field.value }}"
      </div>
    </div>
    <div class="project-right">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="hovering"
            icon
            x-small
            v-bind="attrs"
            v-on="on"
            @click="edit"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Edit field</span>
      </v-tooltip>          
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="hovering"
            icon
            x-small
            v-bind="attrs"
            v-on="on"
            @click="remove"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Delete field</span>
      </v-tooltip>          
    </div>
  </div>
</template>

<script>
export default {
  name: 'field-row',
  props: {
    field: Object,
  },
  data() {
    return {
      hovering: false,
    };
  },
  methods: {
    edit() {
      this.$emit('edit');
    },
    remove() {
      this.$emit('remove');
    },
  },
}
</script>

<style scoped>
.hover-button {
  visibility: hidden;
}

.hover-button:hover {
  visibility: visible;
}

.field-row:hover {
  background-color: #f5f5f5;
}
</style>