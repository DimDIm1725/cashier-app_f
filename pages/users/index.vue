<template>
  <div>
    <v-row class="frame-content">
      <v-col cols="10" offset="1">
        <v-card class="my-3">
          <v-toolbar color="primary" dark>
            Users
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
              hide-details></v-text-field>
          </v-toolbar>
          <v-card-text>
            <v-alert v-if="alert.show" :type="alert.type">
              {{ alert.message }}
            </v-alert>
            <div class="d-flex mb-4">
              <v-breadcrumbs class="pa-0" :items="breadcrumbs" />
              <v-spacer></v-spacer>
              <v-btn to="/users/create" color="primary" elevation="3" small>
                Add user <v-icon right>mdi-plus-circle</v-icon>
              </v-btn>
            </div>
            <v-data-table :headers="headers" :items-per-page="10" :server-items-length="totalData" :items="users"
              :loading="loading" :options.sync="options" :search.sync="search"
              :footer-props="{ itemsPerPageOptions: [10, 20, 30, 40, 50, 100] }">
              <!-- dialog delete -->
              <template v-slot:top>
                <v-dialog v-model="dialogDelete" transition="dialog-transition" max-width="500px">
                  <v-card>
                    <v-card-title primary-title>
                      Apakah anda yakin ingin menghapus data {{ itemDelete.fullname }}
                    </v-card-title>
                    <v-card-actions>
                      <v-btn color="error" @click="deleteConfirm(itemDelete._id)">Delete</v-btn>
                      <v-btn color="secondary" text @click="closeDelete">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>

              <!-- actions -->
              <template v-slot:item.actions="{ item }">
                <v-btn :to="`/users/edit/${item._id}`" color="warning" icon>
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn color="error" icon @click="deleteItem(item)">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default ({
  head: {
    title: 'Users'
  },
  data() {
    return {
      alert: {
        show: false,
        type: '',
        message: ''
      },
      dialogDelete: false,
      itemDelete: false,
      search: '',
      loading: false,
      options: {},
      totalData: 0,
      users: [],
      headers: [
        { text: '#', value: 'row', sortable: false },
        { text: 'Full Name', value: 'fullname', sortable: false },
        { text: 'Email', value: 'email', sortable: false },
        { text: 'Role', value: 'role', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
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
      this.$axios.$get(`/users?page=${page}&limit=${itemsPerPage}&search=${this.search}`)
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
    },
    deleteConfirm(id) {
      this.$axios.$delete(`/users/${id}`)
        .then(response => {
          this.users = this.users.filter(user => user._id !== id)

          // show alert
          let params = {
            message: 'DELETE_SUCCESS',
            fullname: this.itemDelete.fullname
          }
          this.showAlert(params)

          this.closeDelete()
        }).catch(err => {
          console.log(err)
          this.closeDelete()
        });
    },
    deleteItem(item) {
      this.dialogDelete = true
      this.itemDelete = item
    },
    closeDelete() {
      this.dialogDelete = false
    },
    showAlert(params) {
      if (params.message == 'CREATE_SUCCESS') {
        this.alert.show = true
        this.alert.type = 'success'
        this.alert.message = this.$t(params.message, {
          title: params.fullname
        })
      }
      if (params.message == 'UPDATE_SUCCESS') {
        this.alert.show = true
        this.alert.type = 'success'
        this.alert.message = this.$t(params.message, {
          title: params.fullname
        })
      }
      if (params.message == 'DELETE_SUCCESS') {
        this.alert.show = true
        this.alert.type = 'success'
        this.alert.message = this.$t(params.message, {
          title: params.fullname
        })
      }
      if (params.message == 'ID_NOT_FOUND') {
        this.alert.show = true
        this.alert.type = 'error'
        this.alert.message = this.$t(params.message)
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchUsers()
      },
      deep: true
    },
    search: {
      handler() {
        this.fetchUsers()
      }
    }
  },
  mounted() {
    this.showAlert(this.$route.params)
  }
})
</script>
