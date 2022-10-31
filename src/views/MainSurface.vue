<!--
 * @FileDescription: 新闻主要界面布局vue
 * @Author: 郑友捷
 * @Date: 2022-10-18 19:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-18 19:00  
 -->

<template>
    <body>
    <n-layout position="absolute">
        <n-layout-header bordered embedded style="height: 74px; padding: 18px 96px; position: fixed">
            <Navigation/>
        </n-layout-header>
        <n-layout-content ref="contentRef" position="absolute" style="top: 74px;">
            <router-view></router-view>
        </n-layout-content>
    </n-layout>
    </body>
</template>

<script lang="ts">
import Navigation from "../components/NavigationBar.vue"
import themeOverrides from "../components/MenuTheme"
import { h,defineComponent, Ref, ref } from 'vue'
import {decodeToken} from "@/main"
import {RouterLink,useRouter,} from 'vue-router'
import {  
    NLayout,
    NLayoutHeader, 
    NLayoutContent,
    useDialog
    } from 'naive-ui'
import API from "@/store/axiosInstance"
    // 按需引入naive-ui组件
    // 之后可能会把上述引入集中在一个固定的ts文件中
export default defineComponent({
    components: {
        NLayout,
        NLayoutHeader,
        Navigation,
        NLayoutContent,
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
                        API({
                            headers:{"Authorization": window.localStorage.getItem("token")},
                            // 携带token字段
                            url:'logout/',
                            method:'post'}).then((res) => {
                                console.log(res)
                            })
                            .catch((error) => {
                                console.log(error)
                        })
                        window.localStorage.removeItem('token')
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