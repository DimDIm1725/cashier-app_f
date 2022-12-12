<template>
  <div>
    {{ cartItems }}
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default ({
  computed: {
    ...mapState('carts', {
      items: 'items'
    }),
    ...mapGetters('carts', {
      cartItems: 'cartItems'
    })
  }
})
</script>
