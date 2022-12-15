export const state = () => ({
  products: [],
  categories: [{ _id: 0, title: 'All' }],
  categoryId: 0,
})

export const mutations = {
  updateCategoryId(state, categoryId) {
    state.categoryId = categoryId
  },
  updateProducts(state, products) {
    state.products = products
  },
  updateCategories(state, categories) {
    state.categories.push(...categories)
  },
}

export const actions = {
  updateCategoryId({ commit }, categoryId) {
    commit('updateCategoryId', categoryId)
  },
  fetchProducts({ commit }) {
    return this.$axios
      .$get('http://localhost:3000/products')
      .then((response) => {
        commit('updateProducts', response.products)
      })
  },
  fetchCategories({ commit }) {
    return this.$axios
      .$get('http://localhost:3000/categories')
      .then((response) => {
        commit('updateCategories', response.categories)
      })
  },
}
