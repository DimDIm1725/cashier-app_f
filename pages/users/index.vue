<template>
  <div>
    <v-row>
      <v-col cols="10" offset="1">
        <v-card class="my-3">
          <v-toolbar color="primary" class="white--text">
            Users
          </v-toolbar>
          <v-card-text>
            <div class="mb-4">
              <v-breadcrumbs class="pa-0" :items="breadcrumbs" />
            </div>
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
      breadcrumbs: [
        {
          text: 'Users',
          disabled: true,
          to: '/users'
        }
      ]
    }
  }
})
</script>
