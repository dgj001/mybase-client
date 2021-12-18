<template>
 <v-dialog
    v-model="showDialog"
    @input="inputDialog"
    width="400px"
  >
    <v-card>
      <v-card-title class="primary white--text">
        Create a project
      </v-card-title>
      <v-card-text class="mt-5">
        <v-card>
          <v-card-text>
            <v-badge :content="step">
            </v-badge>
            <span class="ml-5">
              {{ stepDescription }}
            </span>
          </v-card-text>
        </v-card>
        <div v-if="step === 1" class="step mt-5">
          <div class="d-flex align-center name-area">
            <v-text-field
              label="Name"
              filled
              v-model="projectName"
              @keydown="keyDownName"
              @input="inputName"
              :error-messages="projectError"
            />
          </div>
          <v-chip
            outlined
          >
            <v-icon left>
              mdi-pencil
            </v-icon>
            {{ projectTarget }}
          </v-chip>
        </div>
        <div v-if="step === 2" class="step mt-5">
          <div class="step d-flex align-center justify-center">
            <v-progress-circular
              :size="100"
              :width="15"
              :value="progress"
              color="primary"
            />
          </div>
        </div>
      </v-card-text>
      <v-card-actions>       
        <v-spacer></v-spacer>
        <v-btn
          text
          :disabled="cancelDisabled"
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          :disabled="nextDisabled"
          @click="create"
        >
          Next
        </v-btn>
     </v-card-actions>
   </v-card>
  </v-dialog>
</template>

<script>
import debounce from 'lodash/debounce';
import { mapActions } from 'vuex';

export default {
  name: 'new-project-dialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showDialog: false,
      projectName: null,
      projectTarget: null,
      projectError: null,
      nextDisabled: true,
      cancelDisabled: false,
      progress: 0,
      step: 1,
    };
  },
  computed: {
    stepDescription() {
      if (this.step === 1) {
        return 'Choose a name';
      } else if (this.step === 2) {
        return 'Creating project...';
      }
      return null;
    }
  },
  watch: {
    show(newValue) {
     this.reset();
     this.showDialog = newValue;
   },
  },
  methods: {
    ...mapActions('projectName', {
      findTarget: 'findTarget',
    }),
    ...mapActions('projectList', {
      createProject: 'create',
    }),
    inputDialog() {
      // click outside of dialog closing it
      this.$emit('cancel')
    },
    keyDownName() {
      this.nextDisabled = true;
      this.projectError = null;
    },
    inputName: debounce(function inputName(value) {
      const params = {
        candidateName: value
      }
      if (value && value.length >= 4) {
        this.findTarget(params).then(target => {
          this.projectTarget = target;
          this.nextDisabled = false;
        });
      } else {
        this.projectError = 'A project name must have 4 or more characters'
      }
    }, 1000),
    cancel() {
      this.$emit('cancel');
    },
    create() {
      this.cancelDisabled = true;
      this.nextDisabled = true;
      this.step = 2;
      this.interval = setInterval(() => {
        if (this.progress < 99.9) {
          this.progress += 33.3;
        } else {
          clearInterval(this.interval);
          this.$emit('cancel');
          this.$router.push({ 
            name: `project`, 
            params: { id: this.newProjectId },
          });
        }
      }, 1000);
      this.createProject(this.projectName).then((newProject) => {
        this.newProjectId = newProject._id;
      });
    },
    reset() {
      this.projectName = null;
      this.projectTarget = null;
      this.projectError = null;
      this.nextDiabled = true;
      this.cancelDisabled = false;
      this.progress = 0;
      this.step = 1;
      this.newProjectId = null;
    },

  },
}
</script>

<style scoped>
.step {
  height: 200px;
}
.name-area {
  height: 150px;
}
</style>