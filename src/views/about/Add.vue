<template>
  <div class="aboutadd">
    about ----- add
    <br>
    <el-button @click="goback">返回</el-button>
  </div>
</template>
<script>
export default {
  name: "AboutAdd",
  data() {
    return {};
  },
  components: {},

  methods: {
    goback() {
      this.$router.push("/about");
    }
  }
};
</script>


