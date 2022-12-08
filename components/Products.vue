<template>
  <v-row>
    <v-col v-for="(product, index) in products" :key="product.id" cols="2">
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
</template>

<script>
export default ({
  data() {
    return {
      products: [
        { id: 1, title: 'Asus Zenfone', thumbnail: 'asus-zenfone.png', price: 2000000, categoryId: 1 },
        { id: 2, title: 'Canon Eos 700d', thumbnail: 'canon-eos-700d.png', price: 4300000, categoryId: 2 },
        { id: 3, title: 'Canon Eos 750d', thumbnail: 'canon-eos-750d.png', price: 5400000, categoryId: 2 },
        { id: 4, title: 'Iphone 6 Silver', thumbnail: 'iphone-6-silver.png', price: 2500000, categoryId: 1 },
        { id: 5, title: 'Galaxy A3', thumbnail: 'samsung-galaxy-A3.png', price: 3000000, categoryId: 1 },
      ]
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
