<!--
 * @FileDescription: 新闻主要界面布局vue
 * @Author: 郑友捷
 * @Date: 2022-10-18 19:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-18 19:00  
 -->

<template>
  <body>
    <n-layout position="absolute" style="top: 0px;bottom: 0px;">
        <n-layout-header style="box-shadow:0px 2px 2px #808080 ;width:100%;top: 0;left: 0; position: fixed;background-color: aqua ;  text-align:center;">
            <!-- 布置顶部导航栏 -->
            <!-- 每一个按钮对应着相同的跳转网址 -->
            <tr>
            <!-- 以表格组件来布局顶部导航栏，方便控制不同组件的间隔 -->
            <th style="height:50px">
                <router-link to="/">
                <img :src="imgurl"
                style="height:30px;"/>
                </router-link>
                <!-- 点击图片会进行跳转，跳转到主页 -->
            </th>
            <n-divider :vertical=true />
            <th style="width:90%;text-align:left">
                <n-menu  mode="horizontal" :options="menuOptions" :theme-overrides="themeOverrides" default-value="info"/>
            </th>
            <!-- 跳转到主页的搜索主页按钮 -->
            <n-divider :vertical=true />
            <th style="width:50%">
                <div class="guide_button">
                    <div v-if="username != ''">
                        <n-dropdown trigger = "hover" :options="userOptions" @select="handleSelect">
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
            </th>
            <!-- 布局下拉菜单，显示用户选项 -->
            <!-- 支持切换账号和退出登录 -->
            </tr>
        </n-layout-header>
        <n-layout position="absolute" style="top: 64px;bottom: 0px;">
            <router-view></router-view>
        </n-layout>
    </n-layout>

    <n-dialog-provider> 
        <n-message-provider>
            <Dialog ref="sonRef"></Dialog>
        </n-message-provider>
    </n-dialog-provider>
    <!-- 布置弹窗子控件，并命名为sonRef -->
  </body>
</template>

<script lang="ts">
import themeOverrides from "../components/MenuTheme"
import Dialog from "@/components/InputDialog.vue"
import { h,defineComponent, Ref, ref } from 'vue'
import {RouterLink} from 'vue-router'
import {  
    NLayout,
    NLayoutHeader, 
    NButton, 
    NDivider,
    NDropdown,
    NMenu,
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
        NMenu,
        NDivider,
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
        const userOptions = [
            {
                label:"个人主页",
                key:"Home",
            },
            {
                label:"退出",
                key:"exit",
            }
        ]
        const menuOptions = [
        {
            label: () =>
            h(
                RouterLink,
                {
                innerHTML:'主页',
                to: {
                    path:'/'
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
                innerHTML:'搜索',
                to: {
                    path:'/user/userInformation/' + username.value
                }
                },
            ),
            key: 'modify',
        },
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
            userOptions,
            menuOptions,
            imgurl:require("../assets/log-news.png"),
            themeOverrides,
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