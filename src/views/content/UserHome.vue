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
          <n-space vertical style="margin-top: 10%;">
            <n-space vertical style="text-align: center;">
              <n-image  width=80 height=80 object-fit="cover"
              :src="state.user.avatar"
              preview-disabled
              style=" border-radius:50%; box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, .16);"
              :fallback-src="default_logo"
              /> 
              <n-text>
                {{state.user.user_name}}
              </n-text>
            </n-space>
            <n-config-provider :theme-overrides="menuThemeOverrides">
              <n-menu :options="menuOptions" :default-value="default_val" />
            </n-config-provider>  
          </n-space>

        </n-layout-sider>
        <!-- 侧边导航栏，包括详细信息与修改密码 -->
        <n-layout-content content-style="padding: 24px;">
          <router-view :user="state.user"></router-view>
          <!-- 中心部分按照当前路由进行显示 -->
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-space>
  
</template>

<script setup lang="ts">
import {h,Component, reactive,defineEmits} from "vue"
import {RouterLink, useRouter} from 'vue-router'
import {NLayout,NLayoutSider, NLayoutContent,NSpace,NMenu,NIcon,NConfigProvider,NImage,NText,useDialog  } from 'naive-ui'
import {decodeToken} from "@/main"
import API from "@/store/axiosInstance"
import {
  PersonOutline as PersonIcon,
  LibraryOutline as HistoryIcon,
  StarOutline as FavoriteIcon,
  LockClosedOutline as PasswordIcon,
  LogOutOutline as LogoutIcon,
} from '@vicons/ionicons5'
export interface UserInfo {
  id: string,
  user_name: string,
  signature: string,
  tags: string[],
  mails: string,
  avatar: string,
}
const state = reactive({user: {} as UserInfo})
// 设置组件
let flag = decodeToken()
let router = useRouter()
let path = router.currentRoute.value.path
if(typeof(flag) == "boolean") {
    alert("请先登录或者注册")
    router.push("/")
}

API({
    headers:{"Authorization": window.localStorage.getItem("token")},
    url:'user_info',
    method:'get',
    // 根据不同类别，把类别放在了对应的请求参数中
}).then((res)=>{
    state.user = res.data.data
    console.log(res)
}).catch((error) => {
    console.log(error);
});
const emits = defineEmits(['reload']);
const default_logo = require("@/assets/asyNc_avatar.png")
function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const exitDialog = useDialog()

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          innerHTML:'用户信息',
          to: {
            path:'/user/userInformation'
          }
        },
      ),
    key: 'info',  
    path: '/user/userInformation',
    icon: renderIcon(PersonIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          innerHTML:'修改密码',
          to: {
            path:'/user/modifyPassword'
          }
        },
      ),
    key: 'modify',
    path: '/user/modifyPassword',
    icon: renderIcon(PasswordIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          innerHTML:'浏览历史',
          to: {
            path:'/user/modifyPassword'
          }
        },
      ),
    key: 'history',
    path: '/user/modifyPassword',
    icon: renderIcon(HistoryIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          innerHTML:'我的收藏',
          to: {
            path:'/user/modifyPassword'
          }
        },
      ),
    key: 'favorites',
    path: '/user/modifyPassword',
    icon: renderIcon(FavoriteIcon),
  },
  {
    label: () =>
      h(
        'div',
        {
          innerHTML:'退出登录',
          onclick:() => {
            exitDialog.warning({
            title: '退出登录确认',
            content: '你确定退出登录吗QWQ？',
            positiveText: '确认',
            negativeText: '取消',
            onPositiveClick: () => {
                API({
                    headers:{"Authorization": window.localStorage.getItem("token")},
                    // 携带token字段
                    url:'logout/',
                    method:'post'}).then((res) => {
                        console.log(res)
                        window.localStorage.removeItem('token')
                        state.user = {} as UserInfo
                        router.push("/")
                        emits('reload')
                    })
                    .catch((error) => {
                        console.log(error)
                })
            },
            onNegativeClick: () => {
            }
          })
        },
      }
      ),
    key: 'logout',
    path: '/user/logout',
    icon: renderIcon(LogoutIcon),
  },
]
const menuThemeOverrides = {
  Menu: {
    itemHeight: '50px',
    borderRadius: '20px'
  }
}
// 设置侧边菜单选项
// 同时使用render函数将菜单按钮设置为可以改变路由
// 从而触发中心内容的改变
// 加入侧边导航栏菜单，每一个选项对应一个路由跳转

var default_val:string = ''

for(let x of menuOptions) {
  if(path.indexOf(x.path) == 0 ) {
    default_val = x.key
    break
  }
}
// 获取初始的选项，与路由对应



</script>

<style>

</style>