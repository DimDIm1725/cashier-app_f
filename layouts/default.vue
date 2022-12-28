<template>
  <v-app dark>
    <v-navigation-drawer disable-resize-watcher v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed
      app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      items: [],
      originalItems: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
          middleware: 'authenticated'
        },
        {
          icon: 'mdi-account',
          title: 'Account',
          to: '/account',
          middleware: 'authenticated'
        },
        {
          icon: 'mdi-login',
          title: 'Login',
          to: '/login',
          middleware: 'unauthenticated'
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          to: '/logout',
          middleware: 'authenticated'
        },
      ],
      miniVariant: false,
      title: 'Cashier App',
    }
  },
  computed: {
    ...mapGetters('auth', {
      authenticated: 'authenticated',
    })
  },
  methods: {
    isWelcomeScreen() {
      if (!localStorage.welcomeScreen) {
        if (this.$router.currentRoute.path != '/register' && this.$router.currentRoute.path != '/login') {
          this.$router.push('/register')
        }
      }
    },
    filterSideMenu() {
      this.items = this.originalItems.filter(item => {
        if (this.authenticated) {
          return item.middleware == 'authenticated';
        } else {
          return item.middleware == 'unauthenticated';
        }
      })
    }
  },
  watch: {
    $route() {
      this.isWelcomeScreen()
    },
    authenticated() {
      this.filterSideMenu()
    }
  },
  mounted() {
    // localStorage.setItem("welcomeScreen", true)
    this.isWelcomeScreen()
    this.filterSideMenu()
  }
}
</script>
