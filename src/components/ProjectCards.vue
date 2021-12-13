<template>
  <div class="project-cards">
    <div class="top-background" />
    <v-main>
      <v-container>
        <div class="top-card-spacer pb-4">
          MyBase projects:
        </div>
        <v-row>
          <v-col cols="3">
            <new-project-card />
            <project-card
              v-for="project of columnList1"
              :key="project._id"
              :project="project"
            />
          </v-col>
          <v-col cols="3">
            <project-card
              v-for="project of columnList2"
              :key="project._id"
              :project="project"
            />
          </v-col>
          <v-col cols="3">
            <project-card
              v-for="project of columnList3"
              :key="project._id"
              :project="project"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main> 
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import NewProjectCard from './NewProjectCard';
import ProjectCard from './ProjectCard';

export default {
  name: 'project-cards',
  components: {
    NewProjectCard,
    ProjectCard,
  },
  computed: {
    ...mapGetters('projectList', {
      projectList: 'getList'
    }),
    columnList1() {
      return this.projectList.filter((project, index) => (index + 1) % 3 === 0);
    },
    columnList2() {
      return this.projectList.filter((project, index) => (index + 1) % 3 === 1);
    },
    columnList3() {
      return this.projectList.filter((project, index) => (index + 1) % 3 === 2);
    },
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    ...mapActions('projectList', {
      fetchProjects: 'fetch',
    }),
  }
}
</script>

<style scoped>
.project-cards {
  position: relative;
  background-color: #f0f0f0;
  height: 100%;
}
.top-background {
  position: absolute;
  left: 0px;
  right: 0px;
  background-color: #3C787E;
  height: 300px;
}
.top-card-spacer {
  display: flex;
  height: 100px;
  align-items: flex-end;
  color: white;
}
</style>