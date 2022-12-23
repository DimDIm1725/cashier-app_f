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
              <v-text-field name="fullname" label="Full Name" type="fullname"></v-text-field>
              <v-text-field name="email" label="Email" type="email"></v-text-field>
              <v-text-field name="password" label="Password" type="password"></v-text-field>
              <v-text-field name="repassword" label="Retype Password" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
        <p>Sudah punya akun? <a href="/login">login</a></p>
      </v-col>
    </v-row>
  </div>
</template>
