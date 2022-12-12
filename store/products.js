export const state = () => ({
  products: [
    {
      id: 1,
      title: 'Asus Zenfone',
      thumbnail: 'asus-zenfone.png',
      price: 2000000,
      categoryId: 1,
    },
    {
      id: 2,
      title: 'Canon Eos 700d',
      thumbnail: 'canon-eos-700d.png',
      price: 4300000,
      categoryId: 2,
    },
    {
      id: 3,
      title: 'Canon Eos 750d',
      thumbnail: 'canon-eos-750d.png',
      price: 5400000,
      categoryId: 2,
    },
    {
      id: 4,
      title: 'Iphone 6 Silver',
      thumbnail: 'iphone-6-silver.png',
      price: 2500000,
      categoryId: 1,
    },
    {
      id: 5,
      title: 'Galaxy A3',
      thumbnail: 'samsung-galaxy-A3.png',
      price: 3000000,
      categoryId: 1,
    },
  ],
  categories: [
    { id: false, title: 'All' },
    { id: 1, title: 'Smartphone' },
    { id: 2, title: 'Camera' },
  ],
  categoryId: 0,
})

export const mutations = {
  updateCategoryId(state, categoryId) {
    state.categoryId = categoryId
  },
}

export const actions = {
  updateCategoryId({ commit }, categoryId) {
    commit('updateCategoryId', categoryId)
  },
}
