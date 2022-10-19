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
    <n-dialog-provider> 
        <n-message-provider>
            <Dialog ref="sonRef"></Dialog>
        </n-message-provider>
    </n-dialog-provider>
    <n-layout style="width:100%;height: 100%;">
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

<script lang="ts">
import Dialog from '@/components/InputDialog.vue'
import {h,defineComponent,ref,Ref} from "vue"
import {RouterLink} from 'vue-router'
import { NLayout,NLayoutSider, NLayoutContent,NSpace,NMenu,NDialogProvider,NMessageProvider} from 'naive-ui'
export default defineComponent({
  components: {
    NLayoutSider,
    NLayoutContent,
    NLayout,
    Dialog,
    NSpace,
    NMenu,
    NDialogProvider,
    NMessageProvider
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
    
    var username:string = ""
    if (sessionStorage.getItem('username') != null) {
        username = sessionStorage.getItem('username')
    }
    // 获取当前用户名称
    const sonRef:Ref<any | null> = ref(null)
    // 引入弹窗控件
    function handleSelect (key:string){
        /**
        * @description: 对用户名的下拉菜单的处理
        * @param {string} key - 选中的菜单值，如为edit则是退出登录，若是change则切换用户出现弹窗
        * @return {void}
        */
      if(key == "exit") {
        sonRef.value.exitDialog()
        // 弹出确认弹窗
      }
      else {
          // 主要实现存储参数的功能
          // 准备弹窗
          // 应该先退出之后再出现登录接口
          // 本次提交暂时不实现切换用户的功能
      }
    }
    return {
      menuOptions,
      username,
      options,
      handleSelect,
      Dialog,
      sonRef,
    }
  }
})
</script>

<style>

</style>