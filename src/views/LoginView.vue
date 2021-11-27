<template>
  <v-app>
    <v-container fill-height fluid class="login-container">
      <v-card elevation="2" class="mx-auto" min-width="500px">
        <v-card-text>
          <v-img 
            src="@/assets/logo.png" 
            class="mx-auto mb-5"
            max-height="100%"
            max-width="88px"
          />
          <div>
            <v-text-field
              label="Email"
              filled persistent-placeholder
              v-model="email"
              @keypress.enter="onLogin"
            />          
            <v-text-field
              label="Password"
              filled persistent-placeholder
              v-model="password"
              class="input-group--focused"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            />
          </div>
        </v-card-text>
        <v-card-actions class="card-actions">
          <div>
            <span class="red--text ml-3">{{ error }}</span>
            <v-progress-circular v-if="loading" class="mr-3" :indeterminate="true" />
          </div>
          <v-spacer />
          <v-btn color="primary" class="mr-3" :disabled="loading" @click="onAction">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app> 
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'login-view',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
    };
  },
  mounted() {
    this.clear();
  },
  computed: {
    ...mapGetters('auth', {
      loggingIn: 'getIsLoggingIn',
      authError: 'getError',
    }),
    loading() {
      return this.loggingIn;
    },
    error() {
      return this.authError;
    }
  },
  methods: {
    ...mapActions('auth', [
      'login',
      'clear'
    ]),
    onAction() {
      this.onLogin();
    },
    async onLogin() {
      this.login({ email: this.email, password: this.password }).then(() => {
        this.$router.push('/projects');
      });
    },
  }
}
</script>

<style scoped>
.login-container {
  background-color: #d0d2d3;  
}
</style>