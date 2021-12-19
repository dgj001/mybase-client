<template>
  <div 
    class="db-row field-row" 
    @mouseover="hovering = true" 
    @mouseleave="hovering = false"
  >
    <div class="db-left-col">
      <div class="db-button" />
      <div class="db-name">
        {{ field.name }}:
      </div>
      <div>
        "{{ field.value }}"
      </div>
    </div>
    <div>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="hovering"
            icon
            x-small
            v-bind="attrs"
            v-on="on"
            @mousedown="saveCoords"
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
      coords: { x: 0, y: 0 },
    };
  },
  methods: {
    edit() {
      this.$emit('edit', this.coords);
    },
    remove() {
      this.$emit('remove');
    },
    saveCoords(e) {
      this.coords = {
        x: e.clientX,
        y: e.clientY,
      };
    }
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