<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
import MyFooter from '~components/Footer.vue'

export default {
    components: {
        MyFooter
    }
}
</script>

<style>
.sticky{
  position: -webkit-sticky;
  position: sticky;
  top: 0
}
  a{
    color: #ffffff;
  }
</style>
