<template>
  <div>
    <h1>你好{{url}}</h1>
    <h2>{{$store.state.filterName}}</h2>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      url: ''
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      this.url = process.env.baseUrl;
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  }
};
</script>
