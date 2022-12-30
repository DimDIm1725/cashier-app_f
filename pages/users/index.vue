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
            <v-data-table :headers="headers" :items-per-page="10" :server-items-length="totalData" :items="users"
              :loading="loading" :options.sync="options"
              :footer-props="{ itemsPerPageOptions: [10, 20, 30, 40, 50, 100] }" />
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
      loading: false,
      options: {},
      totalData: 0,
      users: [],
      headers: [
        { text: '#', value: 'row', sortable: false },
        { text: 'Full Name', value: 'fullname', sortable: false },
        { text: 'Email', value: 'email', sortable: false },
        { text: 'Role', value: 'role', sortable: false },
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
      const { page, itemsPerPage } = this.options
      this.loading = true
      this.$axios.$get(`http://localhost:3000/users?page=${page}&limit=${itemsPerPage}`)
        .then(response => {
          this.loading = false
          this.users = response.users.docs
          this.totalData = response.users.totalDocs

          // let startItem = (page - 1) * itemsPerPage + 1
          let startItem = response.users.pagingCounter
          this.users.map(user => user.row = startItem++)
        }).catch(err => {
          this.loading = false
          console.log(err)
        });
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchUsers()
      },
      deep: true
    }
  }
})
</script>
