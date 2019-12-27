<template>
    <div class="">
      <Header></Header>
      <Sidebar></Sidebar>
      <Content></Content>
    </div>
</template>

<script>
  import Header from "@/components/layout/Header";
  import Sidebar from "@/components/layout/Sidebar";
  import Content from "@/components/layout/Content";
	export default {
	  name:'Home',
    components: {
      Header,
      Sidebar,
      Content
    },
		data() {
			return {}
		},
		mounted() {
		},
		methods: {},
	}
</script>

<style  lang="scss" scoped>
  /*@import '../assets/styles/mixins.scss';*/
  .one{
    @include section-mixin;
    border:1px solid red;
    color:$cc;
  }
</style>
