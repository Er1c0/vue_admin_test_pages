<template>
  <div class="container">
    <div class="login-dialog">
      <div class="login-dialog-item ">
        <img
          :src="require('./image/creed.png')"
          height="100px"
          class="login-img"
        />
      </div>
      <a-button class="login-dialog-item" @click="toAdmin" type="primary" block>
        admin登录
      </a-button>
      <a-button class="login-dialog-item" @click="toKpy" type="primary" block>
        k登录
      </a-button>
    </div>
    <!-- <router-link to="/dashboard/analysis">进入后台</router-link> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toAdmin() {
      this.$store.commit("SetName", "admin");
      localStorage.setItem("userName", "admin");
      this.$router.push("/form/basic-form");
    },
    toKpy() {
      this.$store.commit("SetName", "k");
      localStorage.setItem("userName", "k");
      this.$router.push("/form/basic-form");
    },
  },
};
</script>

<style lang="less">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: none;
  background: #f0f2f5 url("image/CommonImage.jpg") no-repeat;
  background-size: cover;
  .login-dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    .login-dialog-item {
      margin-bottom: 32px;
      .login-img {
        // border-radius: 90%;
      }
      .login-img:hover {
        transform: rotate(666turn);
        transition-duration: 30s;
        transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
      }
    }
  }
}

// .container:hover {
//   transform: rotate(666turn);
//   transition-duration: 30s;
//   transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
// }
</style>
