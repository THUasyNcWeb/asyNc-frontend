<template>
    <body class="back_img">
        <n-card class="card_bordered">
            <n-grid y-gap="12" :cols="1">
                <n-grid-item style="text-align:center">
                    <n-gradient-text type="success" size=24 >
                        asyNc {{title}}
                    </n-gradient-text>
                </n-grid-item>
                <n-grid-item>
                    <n-gradient-text type="info" size=20 style=" margin-right: 5%;">
                        用户名
                    </n-gradient-text>
                    <n-input  size="large" round placeholder="请输入用户名" style="width:80%;" v-model:value="username">
                    </n-input> 
                </n-grid-item>
                <n-grid-item>
                    <n-gradient-text type="info" size=20 style="display:inline-block; margin-right: 10%;">
                        密码
                    </n-gradient-text>
                    <n-input type="password" size="large" round placeholder="请输入用户名" style="width:80%;" v-model:value="password">
                    </n-input> 
                </n-grid-item>
                <n-grid-item style="text-align:center">
                    <n-button type="success" style="margin-right:10%" @click="login">
                        登录
                    </n-button>
                    <n-button type="success" >
                        注册
                    </n-button>
                </n-grid-item>
            </n-grid>


        </n-card>
    </body>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
import {ref, Ref} from 'vue'
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
        var username:Ref<string> = ref("")
        var password:Ref<string> = ref("")
        function login(){
            console.log(username)
            console.log(password)
            API({
                url:'login/',
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
                // 修改主页用户名的引用
                alert("登录成功")
                // 触发watch关闭弹窗
                router.push("/")
            }).catch((error) => {
                // 登录失败，弹窗不关闭
                console.log(error);
                alert("用户名或密码错误")
            })  
        }
        return {
            username,
            password,
            title,
            login,
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
    width: 30%; 
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow:    0px -0.5px 5px #808080,   /*上边阴影 */
    -0.5px 0px 5px #808080,   /*左边阴影 */
    0.5px 0px 5px #808080,    /*右边阴影 */
    0px 0.5px 5px #808080;    /*下边阴影  */
}


</style>