<!--
 * @FileDescription: 登录注册界面
 * @Author: 郑友捷
 * @Date: 2022-10-20 01:21
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-26 16:16
-->
<template>
    <body class="back_img">
        <n-card class="card_bordered">
            <n-grid y-gap="12" :cols="1">
                <n-grid-item style="text-align:center;margin-bottom: 5%;">
                    <n-gradient-text type="success" size=24 >
                        Welcome to asyNc!
                    </n-gradient-text>
                </n-grid-item>
                <n-grid-item v-if="title=='注册'">
                    <div style="width: 30%; margin-right: 5%; text-align: right; display: inline-block;">
                        <n-gradient-text type="info" size=20 >
                            昵称
                        </n-gradient-text>
                    </div>
                    <n-input size="large" round placeholder="请输入昵称" style="width:60%;">
                    </n-input> 
                </n-grid-item>
                <n-grid-item>
                    <div style="width: 30%; margin-right: 5%; text-align: right; display: inline-block;">
                        <n-gradient-text type="info" size=20 >
                            用户名
                        </n-gradient-text>
                    </div>
                    <n-input size="large" round placeholder="请输入用户名" style="width:60%;" v-model:value="username">
                    </n-input> 
                </n-grid-item>
                <n-grid-item>
                    <div style="width: 30%; margin-right: 5%; text-align: right; display: inline-block;">
                        <n-gradient-text type="info" size=20 >
                            密码
                        </n-gradient-text>
                    </div>
                    <n-input type="password" size="large" round placeholder="请输入密码" style="width:60%;" v-model:value="password">
                    </n-input> 
                </n-grid-item>
                <n-grid-item v-if="title=='注册'">
                    <div style="width: 30%; margin-right: 5%; text-align: right; display: inline-block;">
                        <n-gradient-text type="info" size=20>
                            再次输入密码
                        </n-gradient-text>
                    </div>
                    <n-input type="password" size="large" round placeholder="请再次输入密码" style="width:60%;" v-model:value="re_password">
                    </n-input> 
                </n-grid-item>
                <n-grid-item style="text-align:center">
                    <n-button style="width:100%; margin-top:5%;" type="success" @click="() => {
                        if(title == '登录') {
                            login()
                        }
                        else {
                            register()
                        }
                    }">
                        {{title}}
                    </n-button>
                </n-grid-item>
                <n-grid-item v-if="title=='登录'" style="text-align:center;">
                    <a href="/register">
                        还未注册账号?快猛戳我
                    </a>
                </n-grid-item>
                <!-- 登录界面与注册界面进行勾连 -->
            </n-grid>
        </n-card>
    </body>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
import { ref, Ref } from 'vue'
import API from "../store/axiosInstance"
import {  
    NCard,
    NGradientText,
    NInput,
    NGrid,
    NGridItem,
    NButton,
    } from 'naive-ui'
    // 按需引入naive-ui组件
    // 之后可能会把上述引入集中在一个固定的ts文件中
export default defineComponent({
    components: {
        NCard,
        NGradientText,
        NInput,
        NGrid,
        NGridItem,
        NButton,
    },
    setup(){
        var title:string = ""
        let router = useRouter()
        console.log(router.currentRoute.value.path);
        if (router.currentRoute.value.path == "/login") {
            title = "登录"
        }
        else if (router.currentRoute.value.path == "/register") {
            title = "注册"
        }
        else {
            alert("异常访问")
            router.push("/")
        }
        var username:Ref<string> = ref("")
        var password:Ref<string> = ref("")
        var re_password:Ref<string> = ref("")
        
        function judgeUser(username:string) {
            if(username.length > 14) {
                return false;
            }
            return /^[A-Za-z\u4e00-\u9fa5][-A-Za-z0-9\u4e00-\u9fa5_]*$/.test(username)
        }

        function judgePassword(password : string) {
            if(password.length > 14 || password.length < 8){
                return false;
            }
            return /^[-A-Za-z0-9_]*$/.test(password)
        }

        function judgeRepassword() {
            if(re_password.value != password.value) {
                return false;
            }
            return judgePassword(re_password.value)
        }
        function login(){
            /**
            * @description: 登录功能
            * @return {void}
            */
            API({
                url: 'login/',
                method:'post',
                data:{
                    "user_name": username.value,
                    "password": password.value,
                }
            }).then((res)=>{
                // 对登录接口请求成功
                console.log(res)
                window.localStorage.setItem("token",res.data.data.token)
                // 存储token
                alert("登录成功，欢迎来到asyNc！")
                router.push("/")
            }).catch((error) => {
                console.log(error);
                alert("用户名或密码错误")
            })  
        }
        function register(){
            /**
            * @description: 注册功能
            * @return {void}
            */
           if(judgeUser(username.value) == false) {
                alert("输入用户名不规范")
                return;
           } 
           if(judgePassword(password.value)  == false) {
                alert("输入密码不规范")
                return;
           } 
           if(judgeRepassword() == false) {
                alert("重新输入密码不规范")
                return;
           } 
           console.log(username.value)
           console.log(password.value)
            API({
                url: 'register/',
                method:'post',
                data:{
                    "user_name": username.value,
                    "password": password.value,
                }
            }).then((res)=>{
                // 对注册接口请求成功
                console.log(res)
                window.localStorage.setItem("token",res.data.data.token)
                // 存储token
                alert("注册成功，欢迎来到asyNc！")
                router.push("/")
            }).catch((error) => {
                console.log(error);
                alert("注册失败")
            })  
        }
        return {
            username,
            password,
            title,
            login,
            register,
            re_password,
            judgeUser,
            judgePassword,
            judgeRepassword,
        }
    }
})
</script>

<style scoped>
.back_img {
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(211,960,471)'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%234EC1FF'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='704' height='586.7' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.09'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
    /*  z-index:1; */
    position: fixed;
    width: 100%;
    height: 100vh;
    overflow: auto;
} 

.card_bordered {
    display: flex; 
    border-radius:15px;
    margin-top: 10%;
    margin-left: 55%;
    width: 35%; 
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow:    0px -0.5px 5px #808080,   /*上边阴影 */
    -0.5px 0px 5px #808080,   /*左边阴影 */
    0.5px 0px 5px #808080,    /*右边阴影 */
    0px 0.5px 5px #808080;    /*下边阴影  */
}


</style>