<!--
 * @FileDescription: 修改密码页面
 * @Author: 郑友捷
 * @Date: 2022-10-08 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 10:31
 -->
<template>
    <n-card class="card_bordered">
        <n-grid y-gap="12" :cols="1">
            <n-grid-item style="text-align:center;margin-bottom: 5%;">
                <n-gradient-text type="success" size=24 >
                    请修改密码
                </n-gradient-text>
            </n-grid-item>
            <n-grid-item>
                <div style="width: 30%; margin-right: 5%; text-align: right; display: inline-block;">
                    <n-gradient-text type="info" size=20 >
                        旧密码
                    </n-gradient-text>
                </div>
                <n-input size="large"  type="password" round placeholder="请输入旧密码" style="width:60%;" v-model:value="state.old_password">
                </n-input> 
            </n-grid-item>
            <n-grid-item>
                <div style="width: 30%; margin-right: 5%; text-align: right; display: inline-block;">
                    <n-gradient-text type="info" size=20 >
                        新密码
                    </n-gradient-text>
                </div>
                <n-input size="large"  type="password" round placeholder="请输入新密码" style="width:60%;" v-model:value="state.new_password">
                </n-input> 
            </n-grid-item>
            <n-grid-item>
                <div style="width: 30%; margin-right: 5%; text-align: right; display: inline-block;">
                    <n-gradient-text type="info" size=20 >
                        再次输入新密码
                    </n-gradient-text>
                </div>
                <n-input size="large"  type="password" round placeholder="请再次输入密码" style="width:60%;" v-model:value="state.new_password_again">
                </n-input> 
            </n-grid-item>
            <n-grid-item style="text-align:center">
                    <n-button style="width:100%; margin-top:5%;" type="success" @click="modify()">
                    <!-- <n-gradient-text type="error" size=20 > -->
                        确定
                    <!-- </n-gradient-text> -->
                </n-button>
            </n-grid-item>
        </n-grid>
    </n-card>
</template>

<script setup lang="ts">
import API from "../../store/axiosInstance"
import {reactive, defineProps} from 'vue'
import {useRouter} from 'vue-router'
import {NInput,NButton,NGrid,NGridItem,NGradientText,NCard} from 'naive-ui'
import {decodeToken} from "@/main"
export interface UserInfo {
  id: string,
  user_name: string,
  signature: string,
  tags: string[],
  mails: string,
  avatar: string,
}

const props = defineProps<{
  user:UserInfo,
}>();

const state = reactive({ old_password:"", new_password: "", new_password_again:""})
let flag = decodeToken()
let router = useRouter()
if(typeof(flag) == "boolean") {
    alert("请先登录或者注册")
    router.push("/")
}

function judgePassword(password : string) {
    if(password.length > 14 || password.length < 8){
        return false;
    }
    return /^[-A-Za-z0-9_]*$/.test(password)
}

function judgeRepassword() {
    if(state.new_password_again != state.new_password) {
        return false;
    }
    return judgePassword(state.new_password)
}

function modify() {
    /**
    * @description: 向后端请求修改密码
    * @return {void}
    */           
    if(judgePassword(state.old_password)  == false) {
        alert("输入旧密码不规范")
        return;
    } 
    if(judgePassword(state.new_password)  == false) {
        alert("输入新密码不规范")
        return;
    } 
    if(judgeRepassword() == false) {
        alert("重新输入密码不规范")
        return;
    }  
    // 输入检验
    API({
        headers:{"Authorization": window.localStorage.getItem("token")},
        // 携带token字段
        url:'modifypassword',
        method:'post',
        data:{
            "user_name": props.user.user_name,
            "old_password":state.old_password,
            "new_password":state.new_password,
        }
    }).then((res) => {
        // 若成功响应，则修改成功
        console.log(res)
        alert("修改成功")
        state.old_password = ''
        state.new_password = ''
    }).catch((error)=>{
        // 否则修改失败，根据失败码来进行对应的响应
        console.log(error)
        var code = error.data.code
        if(code == 3) {
            alert("密码错误")
        }
        else if (code == 4) {
            alert("新密码格式不合法")
        }
        alert("修改失败")
    })
}

</script>

<style scoped>
.card_bordered {
    display: flex; 
    border-radius:15px;
    margin: auto; 
    /* margin-left: 50%; */

    width: 60%;
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow:    0px -0.5px 5px #808080,   /*上边阴影 */
    -0.5px 0px 5px #808080,   /*左边阴影 */
    0.5px 0px 5px #808080,    /*右边阴影 */
    0px 0.5px 5px #808080;    /*下边阴影  */
}

</style>