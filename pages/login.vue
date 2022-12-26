<template>
  <div>
    <v-row>
      <v-col cols="5" offset="3" md="4" offset-md="4">
        <v-card class="mb-2">
          <v-toolbar color="primary" class="white--text">
            Login
          </v-toolbar>
          <v-card-text>
            <v-alert v-if="isError" color="red lighten-2" class="white--text">
              {{ message }}
            </v-alert>
            <v-form>
              <v-text-field name="email" label="Email" type="email" v-model="form.email"></v-text-field>
              <v-text-field name="password" label="Password" type="password" v-model="form.password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onSubmit" :disabled="isDisable">
              <span v-if="!isDisable">Login</span>
              <v-progress-circular :value="20" color="primary" indeterminate v-else></v-progress-circular>
            </v-btn>
          </v-card-actions>
        </v-card>
        <p>Belum punya akun? <a href="/register">register</a></p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default ({
  data() {
    return {
      isDisable: false,
      message: '',
      isError: false,
      form: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    storeWelcomeScreen() {
      localStorage.setItem('welcomeScreen', true);
    },
    onSubmit() {
      this.isDisable = true;
      this.$axios.$post('http://localhost:3000/auth/login', this.form)
        .then(response => {
          console.log(response);
          this.isDisable = false;

          // store passed welcome screen
          if (!localStorage.welcomeScreen) {
            this.storeWelcomeScreen()
          }

          // redirect ke halaman dashboard
          this.$router.push('/dashboard');
        }).catch(error => {
          this.message = error.response.data.message;
          this.isError = true;
          this.isDisable = false;
        });
    }
  }
})
</script>
