export const state = () => ({
  items: [],
})

export const getters = {
  cartItems: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      let product = rootState.products.products.find(
        (product) => product.id === id
      )
      return {
        id: id,
        title: product.title,
        price: product.price,
        quantity,
      }
    })
  },
}

export const mutations = {
  addItem(state, id) {
    state.items.push({
      id: id,
      quantity: 1,
    })
  },
  incrementItem(state, id) {
    state.items.find((item) => item.id === id).quantity++
  },
}

export const actions = {
  addToCart({ commit, state }, id) {
    const productItem = state.items.find((item) => item.id === id)
    if (!productItem) {
      commit('addItem', id)
    } else {
      commit('incrementItem', id)
    }
  },
}
