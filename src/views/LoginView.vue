<template>
  <v-app>
    <v-container fill-height fluid class="login-container">
      <v-card flat color="#d0d0d0" class="mx-auto" min-width="500px">
        <v-card-text class="pb-0">
          <div class="brand">
            <v-img 
              src="@/assets/logo-with-text.svg" 
              class="mx-auto mb-5"
              max-width="88px"
            />
          </div>
          <div>
            <v-text-field
              autofocus
              label="Email"
              filled persistent-placeholder dense
              v-model="email"
            />          
            <v-text-field
              label="Password"
              filled persistent-placeholder dense
              v-model="password"
              class="input-group--focused"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              @keypress.enter="onLogin"
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
  background-color: #f0f0f0;
}

.brand {
  background-color: #3C787E;
}
</style>