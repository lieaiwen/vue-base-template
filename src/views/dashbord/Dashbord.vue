<template>
  <div class="dashbord">
    Dashbord
    <div @click = "some()">25546546</div>
  </div>
</template>

<script>
  import routes from '@/router/routes'
export default {
  name: "Dashbord",
  data(){
    return {
      data:[]
    }
  },
  created(){
      this.da = routes;
  },
  components: {},
  methods: {
    some(){
      let data = this.da;
      let b =  filterRoutes(data)
     function filterRoutes(data) {
        return data.find(item => {
          console.log(item)
          if (!item.hidden) {
            return item.children.filter(code => {
              if (code.children) {
                code.children = code.children.filter(foo => !foo.hidden)
              } else {
                code.children = []
              }
            })
          }
        }).children
      }

    },

  }
};
</script>

<style lang="scss" scoped>
.dashbord {
}
</style>
