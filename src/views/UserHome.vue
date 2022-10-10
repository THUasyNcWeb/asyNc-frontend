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
      <n-layout-header bordered style="height:50px;text-align:center;" >
        <tr style="height:50px; ">
          <th>
            <n-image :src="require(`@/assets/log-news.png`)"
              style="height:30px;"></n-image>
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
          <n-divider :vertical=true />
          <th style="width:5%">
            <n-dropdown trigger = "hover" :options="options" @select="handleSelect">
                {{username}}
            </n-dropdown>
          </th>
        </tr>
      </n-layout-header>
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
import {NAnchorLink, NAnchor,NImage,NDivider,NDropdown, NLayout,NLayoutSider, NLayoutContent,NH2,NSpace,NButton,NLayoutHeader,NMenu,NInput} from 'naive-ui'
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

    const options = [
        {
            label:"切换账号",
            key:"Home",
        },
        {
            label:"退出登录",
            key:"edit",
        }
    ]
    const username = sessionStorage.getItem("username")
    return {
      menuOptions,
      username,
      options,
    }
  }
})
</script>

<style>

</style>