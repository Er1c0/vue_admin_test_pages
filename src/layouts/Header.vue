<template>
  <div class="header">
    {{ this.$store.state.userName || this.userName || "--" }}
    <router-link to="/user/login"
      ><span @click="logout">退出</span></router-link
    >
  </div>
</template>

<script>
export default {
  created() {
    this.userName = localStorage.getItem("userName");
  },
  methods: {
    logout() {
      this.$store.commit("SetName", "");
      localStorage.setItem("userName", "");
    },
  },
  data() {
    return {
      userName: "",
    };
  },
};
</script>

<style scoped>
.header {
  float: right;
  padding-right: 20px;
}
</style>
