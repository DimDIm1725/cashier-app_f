<template>
  <div>
    <v-row>
      <v-col cols="5" offset="3" md="4" offset-md="4">
        <v-card class="mb-2">
          <v-toolbar color="primary" class="white--text">
            Login
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field name="email" label="Email" type="email"></v-text-field>
              <v-text-field name="password" label="Password" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
        <p>Belum punya akun? <a href="/register">register</a></p>
      </v-col>
    </v-row>
  </div>
</template>
