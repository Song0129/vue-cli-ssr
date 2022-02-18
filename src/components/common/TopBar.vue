<template>
  <div class="topBar">
    <slot name="menu-btn"></slot>
  </div>
</template>

<script>
  export default {
    name: "TopBar",
    components: {},
    data() {
      return {}
    },
    created() {

    },
    mounted() {

    },
    computed: {},
    methods: {}
  }
</script>

<style scoped lang="less">
  .topBar {
    display: flex;
    padding-left: 10px;

    h1 {
      font-size: 20px;
    }
  }
</style>
