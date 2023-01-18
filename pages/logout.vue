<template>
  <div>
    <v-row>
      <v-col cols="5" offset="3" md="4" offset-md="4">
        <v-card class="mb-2">
          <v-card-text>
            <h2>Logout <v-icon class="ml-3 spin-loading">mdi-loading</v-icon></h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default ({
  middleware: ['authenticated'],
  methods: {
    ...mapMutations('auth', {
      logout: 'logout'
    })
  },
  mounted() {
    setTimeout(() => {
      this.logout();
      this.$router.push('/login');
    }, 1000)
  }
})
</script>
