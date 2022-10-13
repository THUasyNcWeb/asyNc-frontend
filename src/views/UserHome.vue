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
      <n-layout-header bordered style="height:50px;text-align:center;" >
        <!-- 用户页的顶部导航栏 -->
        <tr style="height:50px; ">
        <!-- 以表格组件来布局顶部导航栏，方便控制不同组件的间隔 -->
          <th>
            <router-link to="/">
              <n-image :src="require(`@/assets/log-news.png`)"
              style="height:30px;"></n-image>
            </router-link>
            <!-- 点击图片会进行跳转，跳转到主页 -->
          </th>
          <n-divider :vertical=true />
          <th style="width:90%">
            <n-h2 style="text-align:left">
              用户主页
            </n-h2>
          </th>
          <th style="width:5%">
            <router-link to='/'>搜索主页</router-link>
          </th>
          <!-- 跳转到主页的搜索主页按钮 -->
          <n-divider :vertical=true />
          <th style="width:5%">
            <n-dropdown trigger = "hover" :options="options" @select="handleSelect">
                {{username}}
            </n-dropdown>
          </th>
          <!-- 布局下拉菜单，显示用户选项 -->
          <!-- 支持切换账号和退出登录 -->
        </tr>
      </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider bordered content-style="padding: 24px;">
          <n-menu :options="menuOptions" default-value="info" />
        </n-layout-sider>
        <!-- 侧边导航栏，包括详细信息与修改密码 -->
        <n-layout-content content-style="padding: 24px;">
          <router-view></router-view>
          <!-- 中心部分按照当前路由进行显示 -->
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-space>
  
</template>

<script>
import {h,defineComponent} from "vue"
import { RouterLink, useRouter } from 'vue-router'
import {NImage,NDivider,NDropdown, NLayout,NLayoutSider, NLayoutContent,NH2,NSpace,NLayoutHeader,NMenu} from 'naive-ui'
export default defineComponent({
  components: {
    NLayoutSider,
    NLayoutContent,
    NLayout,
    NH2,
    NSpace,
    NLayoutHeader,
    NMenu,
    NImage,
    NDivider,
    NDropdown,
  },
  setup() {

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
      },
    ]
    // 设置侧边菜单选项
    // 同时使用render函数将菜单按钮设置为可以改变路由
    // 从而触发中心内容的改变
    // 加入侧边导航栏菜单，每一个选项对应一个路由跳转

    const options = [
        {
            label:"切换账号",
            key:"change",
        },
        {
            label:"退出登录",
            key:"exit",
        }
    ]
    // 设置顶部导航栏的下拉菜单
    
    var username = ""
    if (sessionStorage.getItem('username') != null) {
        username = sessionStorage.getItem('username')
    }
    // 获取当前用户名称
    function handleSelect (key){
        /**
        * @description: 对用户名的下拉菜单的处理
        * @param {string} key - 选中的菜单值，如为edit则是退出登录，若是change则切换用户出现弹窗
        * @return void
        */
      if(key == "exit") {
          window.localStorage.removeItem('token')
          sessionStorage.removeItem('username')
          username = ""
          const router = useRouter();
          router.push("/");
      }
      else {
          // 主要实现存储参数的功能
          // 准备弹窗
      }
    }
    return {
      menuOptions,
      username,
      options,
      handleSelect,
    }
  }
})
</script>

<style>

</style>