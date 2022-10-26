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
        <n-layout-header bordered style="width:100%;top: 0;left: 0; position: fixed; z-index: 999999; text-align:center;">
            <!-- 布置顶部导航栏 -->
            <!-- 每一个按钮对应着相同的跳转网址 -->
            <tr>
            <!-- 以表格组件来布局顶部导航栏，方便控制不同组件的间隔 -->
            <th style="height:50px">
                <router-link to="/">
                <n-gradient-text type="success" size=24 style="margin-left: 10px;">
                    asyNc
                </n-gradient-text>
                </router-link>
                <!-- 点击图片会进行跳转，跳转到主页 -->
            </th>
            <n-divider :vertical=true />
            <th style="width:90%;text-align:left">
                <n-menu mode="horizontal" :options="menuOptions" :theme-overrides="themeOverrides" :default-value="now_url" />
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
                        <n-button @click="login_register('login')" :bordered="false">
                            登录
                        </n-button>
                        <n-button @click="login_register('register')" :bordered="false">
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
        <n-layout position="absolute" style="top: 51px;bottom: 0px;">
            <router-view></router-view>
        </n-layout>
    </n-layout>
    </body>
</template>

<script lang="ts">
import themeOverrides from "../components/MenuTheme"
import { h,defineComponent, Ref, ref } from 'vue'
import {decodeToken} from "@/main"
import {RouterLink,useRouter,} from 'vue-router'
import {  
    NLayout,
    NLayoutHeader, 
    NButton, 
    NDivider,
    NDropdown,
    NMenu,
    NGradientText,
    useDialog
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
        NGradientText,
    },
    created(){
        let path = this.$route.path
        if(path == "/") {
            this.now_url = "home"
        }
        else if (path == "/search") {
            this.now_url = "search"
        }
    },
    setup(){
        const username:Ref<string> = ref("")
        // 当前页面的用户名（若已登录）
        let flag = decodeToken()

        if(typeof(flag) == "boolean") {
            username.value = ""
        }
        else if (typeof(flag) == "string") {
            username.value = flag
        }
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
            key: 'home',  
        },
        {
            label: () =>
            h(
                RouterLink,
                {
                innerHTML:'搜索',
                to: {
                    path:'/search'
                }
                },
            ),
            key: 'search',
        },
        ]
        const router = useRouter()
        function login_register (api:string){
            /**
             * @description: 切换到登录或注册界面
             * @param {string} api - 路径类型，可能为login或者register
             * @return {void}
             */
            router.push("/" + api)
        }
        const exitDialog = useDialog()
        function handleSelect (key:string){
            /**
             * @description: 对用户名的下拉菜单的处理
             * @param {string} key - 选中的菜单值，如为edit则是退出登录，若是Home则出现用户管理界面
             * @return {void}
             */
            if(key == "exit") {
                exitDialog.warning({
                    title: '退出登录确认',
                    content: '你确定退出登录吗QWQ？',
                    positiveText: '确认',
                    negativeText: '取消',
                    onPositiveClick: () => {
                        window.localStorage.removeItem('token')
                        sessionStorage.removeItem('username')
                        username.value = ""
                        router.push("/")
                    },
                    onNegativeClick: () => {
                    }
                // 若是退出登录界面，则关闭弹窗
                })
            }   
            else {
                window.open('/user/userInformation/', '_blank')
            }
        }

        return{
            now_url:"",
            username,
            handleSelect,
            login_register,
            userOptions,
            menuOptions,
            themeOverrides,
        }
    }
})
</script>

<style scoped>
.guide_button {
    margin-top: 5px;
    margin-right: 10px !important;
    /* 不同按钮之间须有一定间隔 */
    display: inline-block !important;
    /* 不同按钮需在同一行 */
}

</style>