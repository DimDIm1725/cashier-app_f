export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if (store.getters['auth/authenticated']) {
      config.headers[
        'Authorization'
      ] = `Bearer ${store.state.auth.access_token}`
    }
  })
}
