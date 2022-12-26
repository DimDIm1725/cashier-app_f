<template>
  <div>
    <v-row>
      <v-col cols="5" offset="3" md="4" offset-md="4">
        <v-card class="mb-2">
          <v-toolbar color="primary" class="white--text">
            Registration
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field name="fullname" label="Full Name" type="text" v-model="form.fullname"
                :rules="rules.fullname"></v-text-field>
              <v-text-field name="email" label="Email" type="email" v-model="form.email" :rules="rules.email"
                @keyup="checkEmail"></v-text-field>
              <v-text-field name="password" label="Password" type="password" v-model="form.password"
                :rules="rules.password"></v-text-field>
              <v-text-field name="retype_password" label="Retype Password" type="password"
                v-model="form.retype_password" :rules="rules.retype_password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onSubmit" :disabled="isDisable">Register</v-btn>
          </v-card-actions>
        </v-card>
        <p>Sudah punya akun? <a href="/login">login</a></p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default ({
  data() {
    return {
      emailExist: false,
      isDisable: false,
      form: {
        fullname: '',
        email: '',
        password: '',
        retype_password: '',
      },
      rules: {
        fullname: [
          v => !!v || 'Fullname is required',
        ],
        email: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'Email invalid',
          // v => !!this.emailExist || 'Email already exist'
        ],
        password: [
          v => !!v || 'Password is required',
          v => v.length >= 6 || 'Password must be at least 6 characters',
        ],
        retype_password: [
          v => !!v || 'Retype Password is required',
          v => v === this.form.password || 'Retype Password must be same with Password',
        ],
      }
    }
  },
  methods: {
    checkEmail() {
      this.$axios.$post('http://localhost:3000/auth/check-email', this.form)
        .then(response => {
          console.log(response);
          this.emailExist = false;
        }).catch(error => {
          this.emailExist = true;
          console.log(error);
        });
    },
    onSubmit() {
      this.isDisable = true;
      console.log(this.form);
      this.$axios.$post('http://localhost:3000/auth/register', this.form)
        .then(response => {
          console.log(response);
          this.isDisable = false;
          // redirect ke halaman login
          // this.$router.push('/login')
        }).catch(error => {
          this.isDisable = false;
        });
    }
  }
})
</script>
