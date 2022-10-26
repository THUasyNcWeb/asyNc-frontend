<!--
 * @FileDescription: 用户主页
 * @Author: 郑友捷
 * @Date: 2022-10-07 23:30
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 10:08
 -->

<template>
  <n-space vertical size="large">
    <!-- 以space作为主控件 -->
    <n-layout style="width:100%;height: 100%;">
      <n-layout has-sider>
        <n-layout-sider bordered :width="250">
          <n-config-provider :theme-overrides="menuThemeOverrides">
            <n-menu :options="menuOptions" :default-value="now_url" />
          </n-config-provider>
        </n-layout-sider>
        <!-- 侧边导航栏，包括详细信息与修改密码 -->
        <n-layout-content content-style="padding: 24px;">
          <router-view :username="username"></router-view>
          <!-- 中心部分按照当前路由进行显示 -->
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-space>
  
</template>

<script lang="ts">
import {h,defineComponent,Component} from "vue"
import {RouterLink, useRouter} from 'vue-router'
import {NLayout,NLayoutSider, NLayoutContent,NSpace,NMenu,NIcon,NConfigProvider  } from 'naive-ui'
import {judgeToken} from "@/main"
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon
} from '@vicons/ionicons5'
export default defineComponent({
  components: {
    NLayoutSider,
    NLayoutContent,
    NLayout,
    NSpace,
    NMenu,
    NConfigProvider
  },
  created(){
      let path = this.$route.path
      let flag = judgeToken()
      let router = useRouter()
      if(typeof(flag) == "boolean") {
          alert("请先登录或者注册")
          router.push("/")
      }
      else if (typeof(flag) == "string") {
          this.username = flag
      }
      if(path.indexOf("/user/userInformation") == 0) {
          this.now_url = "info"
      }
      else if (path.indexOf("/user/modifyPassword") == 0) {
          this.now_url = "modify"
      }
  },
  setup() {
    function renderIcon (icon: Component) {
      return () => h(NIcon, null, { default: () => h(icon) })
    }
    const menuOptions = [
      {
        label: () =>
          h(
            RouterLink,
            {
              innerHTML:'用户信息',
              to: {
                path:'/user/userInformation/' + username
              }
            },
          ),
        key: 'info',  
        icon: renderIcon(PersonIcon),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              innerHTML:'修改密码',
              to: {
                path:'/user/modifyPassword/' + username
              }
            },
          ),
        key: 'modify',
        icon: renderIcon(BookIcon),
      },
    ]
    const menuThemeOverrides = {
      Menu: {
        itemHeight: '50px',
        borderRadius: '20px'
      }
      // ...
    }
    // 设置侧边菜单选项
    // 同时使用render函数将菜单按钮设置为可以改变路由
    // 从而触发中心内容的改变
    // 加入侧边导航栏菜单，每一个选项对应一个路由跳转
    var username:string = ""
    // 获取当前用户名称
    return {
      now_url:"",
      menuOptions,
      username:"",
      menuThemeOverrides,
    }
  }
})
</script>

<style>

</style>