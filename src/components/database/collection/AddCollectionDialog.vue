<template>
  <v-dialog
    v-model="showDialog"
    @input="handleInput"
  >
    <v-card>
      <v-card-title class="primary white--text">
        Start a collection
      </v-card-title>
    
      <v-stepper v-model="dialogStep">
        <v-stepper-header class="mt-5 ml-5 mr-5">
          <v-stepper-step
            :complete="dialogStep > 1"
            step="1"
          >
            Give the collection an ID
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="dialogStep > 2"
            step="2"
          >
            Add its first document
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card
              class="mb-6"
              flat
              min-height="200px"
            >
              <div class="mb-2">
                Collection ID
              </div>
              <v-text-field 
                outlined 
                dense
                v-model="collectionName"
                :error-messages="collectionMsg"
              />
            </v-card>

            <div class="d-flex">
              <v-spacer />
              <v-btn 
                text
                @click="cancel"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                class="ml-2"
                :disabled="collectionDisabled"
                @click="checkCollectionAvailability"
              >
                Next
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
              class="mb-6"
              flat
              min-height="200px"
            >          
              <div class="mb-2">
                Document ID
              </div>
              <v-text-field 
                outlined 
                dense
                v-model="documentID"
              />
            </v-card>

            <div class="d-flex">
              <v-spacer />
              <v-btn
                text
                @click="cancel"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                class="ml-2"
                :disabled="saveDisabled"
                @click="save"
              >
                Save
              </v-btn>

            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'add-collection-dialog',
  props: {
    show: Boolean,
    projectId: String,
  },
  data() {
    return {
      showDialog: false,      
      dialogStep: 1,
      collectionName: '',
      collectionMsg: null,
      documentID: '',
    };
  },
  computed: {
    ...mapGetters('collectionName', {
      isCollectionChecking: 'getIsChecking',
    }),
    collectionDisabled() {
      return !this.collectionName || !this.collectionName.length || this.isCollectionChecking;
    },
    saveDisabled() {
      return !this.documentID || !this.documentID.length;
    }
  },
  watch: {
    show(newValue) {
      this.reset();
      this.showDialog = newValue;
    },
  },
  methods: {
    ...mapActions('collectionName', {
      checkCollection: 'check',
    }),
    reset() {
      this.dialogStep = 1;
      this.collectionName = '';
      this.documentID = '';
      this.collectionMsg = null;
    },
    checkCollectionAvailability() {
      this.checkCollection({
        projectId: this.projectId,
        name: this.collectionName,
      }).then(isAvailable => {
        if (isAvailable) {
          this.collectionMsg = null;
          this.dialogStep = 2;
        } else {
          this.collectionMsg = 'Name already used';
        }
      });
    },
    cancel() {
      this.showDialog = false;
      this.$emit('cancel')
    },
    save() {
      this.showDialog = false;
      this.$emit('save', {
        collectionName: this.collectionName,
        documentName: this.documentID,
      });
    },
    handleInput() {
      // click outside of dialog closing it
      this.$emit('cancel')
    },
  },
}
</script>

<style scoped>
.collection-dialog {
  display: flex;
  flex-direction: column;
}
</style>