<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <project-cards />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ProjectCards from '@/components/ProjectCards';

export default {
  name: 'project-view',
  components: {
    ProjectCards,
  },
}
</script>
