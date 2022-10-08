<!--
 * @FileDescription: 新闻搜索系统汇总vue
 * @Author: 郑友捷
 * @Date: 2022-10-03 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-03 14:11
 -->

<template>
  <body>
    <router-view />
  </body>
</template>

<script>

import NewsHome from './views/NewsHome.vue';
import Dialog from './components/dialog.vue';
import Password from './views/user/modifyPassword.vue'
import Info from './views/user/userInformation.vue'
export default {
  name: 'App',
  components: {
    NewsHome,
    Dialog,
    Password,
    Info,
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

* {
  margin: 0;
  padding: 0;
  border: 0
}

body {
  margin: 0;
  padding: 0;
}
</style>
