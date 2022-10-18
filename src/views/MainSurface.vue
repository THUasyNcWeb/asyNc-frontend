<!--
 * @FileDescription: 新闻主要界面布局vue
 * @Author: 郑友捷
 * @Date: 2022-10-18 19:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-18 19:00  
 -->

<template>
  <body>
    <n-dialog-provider> 
        <n-message-provider>
            <Dialog ref="sonRef"></Dialog>
        </n-message-provider>
    </n-dialog-provider>
    <!-- 布置弹窗子控件，并命名为sonRef -->
    <n-layout-header style="height:40px; background: white;text-align: right;">
        <!-- 布置顶部导航栏 -->
        <!-- 每一个按钮对应着相同的跳转网址 -->
        <div class="guide_button">
            <a href="http://www.baidu.com" target="_blank">
                百度首页
            </a>
        </div>
        <n-divider :vertical=true />
        <div class="guide_button">
            <div v-if="username != ''">
                <n-dropdown trigger = "hover" :options="options" @select="handleSelect">
                    <div class="guide_button">{{username}}</div>
                </n-dropdown>
            </div>
            <!-- 若当前已登录，则显示登录的用户名并布置下拉菜单 -->
            <div v-else>
                <n-button @click="dialogHand('login')" :bordered="false">
                    登录
                </n-button>
                <n-button @click="dialogHand('register')" :bordered="false">
                    注册
                </n-button>
            </div>
            <!-- 若当前未登录，则布置登录按钮 -->
        </div>
        <n-tooltip :show-arrow="false" trigger="hover">
            <template #trigger>
                <div class="guide_button">
                    百度新闻客户端
                </div>
            </template>
            <img :src="require(`@/assets/log-news.png`)" style="height:50px;weight:30px" />
            <!-- 当鼠标移至该组件上方即可显示图片 -->
        </n-tooltip>
    </n-layout-header>
    <n-layout>
        <router-view></router-view>
    </n-layout>
  </body>
</template>

<script lang="ts">
import Dialog from "@/components/InputDialog.vue"
import { defineComponent, Ref, ref } from 'vue'
import {  
    NLayout,
    NLayoutHeader, 
    NButton, 
    NDivider,
    NTooltip,
    NDropdown,
    NDialogProvider,
    NMessageProvider,
    } from 'naive-ui'
    // 按需引入naive-ui组件
    // 之后可能会把上述引入集中在一个固定的ts文件中
export default defineComponent({
    components: {
        NLayout,
        NLayoutHeader,
        NButton,
        NDivider,
        NTooltip,
        NDropdown,
        Dialog,
        NDialogProvider,
        NMessageProvider,
    },
    setup(){
        const username:Ref<string> = ref("")
        // 当前页面的用户名（若已登录）
        if (sessionStorage.getItem('username') != null) {
            username.value = sessionStorage.getItem('username')
        }
        const sonRef:Ref< any | null > = ref(null)
        // 引入弹窗控件
        const options = [
            {
                label:"个人主页",
                key:"Home",
            },
            {
                label:"退出",
                key:"exit",
            }
        ]
        function dialogHand (api:string){
            /**
            * @description: 弹出登录或注册接口
            * @param {string} api - 弹窗类型，可能为login或者register
            * @return {void}
            */
            sonRef.value.handleDialog(username, api) 
        }
        function handleSelect (key:string){
            /**
            * @description: 对用户名的下拉菜单的处理
            * @param {string} key - 选中的菜单值，如为edit则是退出登录，若是Home则出现用户管理界面
            * @return {void}
            */
            if(key == "exit") {
                window.localStorage.removeItem('token')
                sessionStorage.removeItem('username')
                username.value = ""
                // 若是退出登录界面，则关闭弹窗
            }
            else {
                //主要实现存储参数的功能
                sessionStorage.setItem("username", username.value);
                window.open('/user/userInformation/' + username.value, '_blank')
            }
        }
        return{
            username,
            sonRef,
            handleSelect,
            dialogHand,
            options,
        }
    }
})
</script>

<style>
.guide_button {
    margin-top: 5px;
    margin-right: 10px !important;
    /* 不同按钮之间须有一定间隔 */
    display: inline-block !important;
    /* 不同按钮需在同一行 */
}
</style>