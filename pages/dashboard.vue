<template>
  <div>
    <v-row>
      <v-col cols="10" offset="1">
        <v-card class="mb-2">
          <v-toolbar color="primary" class="white--text">
            Dashboard
          </v-toolbar>
          <v-card-text>
            <h2>Hello, Nama.</h2>
            {{ authenticated }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default ({
  computed: {
    ...mapGetters('auth', {
      authenticated: 'authenticated'
    })
  },
  mounted() {
    // cek auth
    if (!this.authenticated) {
      this.$router.push({
        name: 'login___' + this.$i18n.locale,
        params: { message: 'AUTH_REQUIRED' }
      })
    }
  }
})
</script>
