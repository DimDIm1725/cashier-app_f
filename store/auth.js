export const state = () => ({
  access_token: null,
  refresh_token: null,
  fullname: null,
})

export const mutations = {
  setAccessToken(state, access_token) {
    state.access_token = access_token
  },
  setRefreshToken(state, refresh_token) {
    state.refresh_token = refresh_token
  },
  setFullname(state, fullname) {
    state.fullname = fullname
  },
}
