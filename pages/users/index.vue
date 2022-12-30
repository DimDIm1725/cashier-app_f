<template>
  <div>
    <v-row class="frame-content">
      <v-col cols="10" offset="1">
        <v-card class="my-3">
          <v-toolbar color="primary" class="white--text">
            Users
          </v-toolbar>
          <v-card-text>
            <div class="mb-4">
              <v-breadcrumbs class="pa-0" :items="breadcrumbs" />
            </div>
            <v-data-table :headers="headers" :items-per-page="10" :items="users" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default ({
  data() {
    return {
      users: [],
      headers: [
        { text: 'Full Name', value: 'fullname' },
        { text: 'Email', value: 'email' },
        { text: 'Role', value: 'role' },
      ],
      breadcrumbs: [
        {
          text: 'Users',
          disabled: true,
          to: '/users'
        }
      ]
    }
  },
  methods: {
    fetchUsers() {
      this.$axios.$get(`http://localhost:3000/users`)
        .then(response => {
          this.users = response.users.docs
        }).catch(err => {
          console.log(err)
        });
    }
  },
  mounted() {
    this.fetchUsers()
  }
})
</script>
