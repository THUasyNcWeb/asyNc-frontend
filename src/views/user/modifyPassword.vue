<!--
 * @FileDescription: 修改密码页面
 * @Author: 郑友捷
 * @Date: 2022-10-08 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 10:31
 -->
<template>
    <div style="top:50px">
        <n-H1>
            请设置新密码
        </n-H1>
        <n-H5>
            旧密码
        </n-H5>
        <n-input type="password" style="width:100%" placeholder="请输入旧密码" v-model:value="state.old_password">
        </n-input>
        <!-- 注意：vue3绑定变量应当使用v-model:value而不是仅仅用v-model -->
        <n-H5>
            新密码
        </n-H5>
        <n-input type="password" style="width:100%;" placeholder="请输入新密码" v-model:value="state.new_password"></n-input>
        <n-button style="margin-top: 10px;" @click="modify">
            确定
        </n-button>
        <!-- 确定修改密码，向后端发送请求 -->
    </div>
</template>

<script setup lang="ts">
import API from "../../store/axiosInstance"
import {reactive, defineProps} from 'vue'
import {useRouter} from 'vue-router'
import {NH1, NH5, NInput,NButton} from 'naive-ui'
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

const state = reactive({ old_password:"", new_password: ""})
let flag = decodeToken()
let router = useRouter()
if(typeof(flag) == "boolean") {
    alert("请先登录或者注册")
    router.push("/")
}

function modify() {
    /**
    * @description: 向后端请求修改密码
    * @return {void}
    */            
    API({
        headers:{"Authorization": window.localStorage.getItem("token")},
        // 携带token字段
        url:'modify_password/',
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

<style>

</style>