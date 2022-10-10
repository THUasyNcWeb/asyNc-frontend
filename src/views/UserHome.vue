<!--
 * @FileDescription: 用户主页
 * @Author: 郑友捷
 * @Date: 2022-10-07 23:30
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-07 23:40
 -->

<template>
  <n-space vertical size="large">
    <n-layout style="width:100%;height: 100%;">
      <n-layout-header style="height:64px">用户主页</n-layout-header>
      <n-layout has-sider>
        <n-layout-sider bordered content-style="padding: 24px;">
          <n-menu :options="menuOptions" />
        </n-layout-sider>
        <n-layout-content content-style="padding: 24px;">
          <router-view></router-view>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-space>
  
</template>

<script>
import {h,defineComponent} from "vue"
import { RouterLink } from 'vue-router'
import {NAnchorLink, NAnchor, NLayout,NLayoutSider, NLayoutContent,NH2,NSpace,NButton,NLayoutHeader,NMenu,NInput} from 'naive-ui'
export default defineComponent({
  components: {
    NAnchorLink,
    NAnchor,
    NLayoutSider,
    NLayoutContent,
    NLayout,
    NH2,
    NSpace,
    NButton,
    NLayoutHeader,
    NMenu,
    NInput,
  },
  setup() {
    const menuOptions = [
      {
        label: () =>
          h(
            RouterLink,
            {
              innerHTML:'测试',
              to: {
                path:'/user/userInformation/' + username
              }
            },
          ),
        key: 'test',
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              innerHTML:'测试修改',
              to: {
                path:'/user/modifyPassword/' + username
              }
            },
          ),
        key: 'test_modify',
      },
    ]
    // 加入侧边导航栏菜单，每一个选项对应一个路由跳转
    const username = sessionStorage.getItem("username")
    return {
      menuOptions,
      username
    }
  }
})
</script>

<style>

</style>