<template>
  <v-app class="project-view">
    <project-top-bar />
    <v-navigation-drawer permanent app mini-variant color="primary">
      <v-list dark>
        <v-list-item class="logo-list-item">
          <v-img 
            src="@/assets/logo.svg"
            class="logo"
          />
        </v-list-item>
        <v-divider light />
        <v-list-item
          :href="cascadeUrl"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-rhombus-split
                </v-icon>
            </template>
            <span>Database</span>
          </v-tooltip>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container style="height: 100%">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import ProjectTopBar from '../components/project/ProjectTopBar';

export default {
  name: 'project-view',
  components: {
    ProjectTopBar,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('projectList', {
      projectId: 'getSelectedId',
    }),
    cascadeUrl() {
      return `/projects/${this.projectId}/cascade`;
    }
  },
}
</script>

<style>
html { 
  overflow-y: auto;
}
</style>

<style scoped>
.project-view {  
  background-color: #f0f0f0;
}
.v-list {
  padding: 0;
}
.logo-list-item {
  padding: 0 8px;
}
</style>