<template>
  <div>
    <v-row align="center">
      <v-col cols="10">
        <v-autocomplete label="Products" placeholder="Start typing to search" :search-input.sync="search"
          :loading="isLoading" :items="itemsSearch" item-text="title" item-value="id" v-model="selectedSearch"
          return-object hide-no-data></v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-menu>
          <template v-slot:activator="{ on: category }">
            <v-btn v-on="category" color="primary">
              Category
            </v-btn>
          </template>

          <v-list>
            <v-list-item-group v-model="categoryId">
              <v-list-item v-for="(category, index) in categories" :key="category.id" :value="category.id"
                :disabled="(category.id === categoryId)">
                <v-list-item-title>{{ category.title }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(product, index) in filteredProducts" :key="product.id" cols="2">
        <v-card :title="product.title" :ripple="true">
          <v-card-action class="img-product">
            <v-img :src="require(`@/assets/images/products/${product.thumbnail}`)"></v-img>
          </v-card-action>
          <v-card-text align="center" class="product-title">
            {{ product.title }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default ({
  name: 'Products',
  data() {
    return {
      categoryId: false,
      categories: [
        { id: false, title: 'All' },
        { id: 1, title: 'Smartphone' },
        { id: 2, title: 'Camera' },
      ],
      products: [
        { id: 1, title: 'Asus Zenfone', thumbnail: 'asus-zenfone.png', price: 2000000, categoryId: 1 },
        { id: 2, title: 'Canon Eos 700d', thumbnail: 'canon-eos-700d.png', price: 4300000, categoryId: 2 },
        { id: 3, title: 'Canon Eos 750d', thumbnail: 'canon-eos-750d.png', price: 5400000, categoryId: 2 },
        { id: 4, title: 'Iphone 6 Silver', thumbnail: 'iphone-6-silver.png', price: 2500000, categoryId: 1 },
        { id: 5, title: 'Galaxy A3', thumbnail: 'samsung-galaxy-A3.png', price: 3000000, categoryId: 1 },
      ],
      search: null,
      isLoading: false,
      itemsSearch: [],
      selectedSearch: null
    }
  },
  methods: {
    resetSearchCategory() {
      this.categoryId = false
    }
  },
  computed: {
    filteredProducts() {
      if (this.categoryId) {
        return this.products.filter(s => s.categoryId === this.categoryId)
      }

      if (this.selectedSearch) {
        return this.products.filter(s => s.title === this.selectedSearch.title)
      }

      return this.products
    }
  },
  watch: {
    search(val) {
      this.isLoading = true
      setTimeout(() => {
        this.itemsSearch = this.products.filter(e => {
          this.isLoading = false
          this.resetSearchCategory()
          return e.title
        })
      }, 1000)
    }
  }
})
</script>

<style scoped>
.product-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.img-product {
  padding: 5rem;
}
</style>
