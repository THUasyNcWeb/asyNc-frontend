<!--
 * @FileDescription: 用户信息界面
 * @Author: 郑友捷
 * @Date: 2022-10-08 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 10:31
 -->
<template>
    <n-card title="用户基本信息" :bordered="true" size="small" class="shadow-sm rounded-16px">
        <n-button v-if="state.edit_status==true" style="float:left" type="warning" @click="returnInfo" >
            返回
        </n-button>
        <n-button style="float:right" type="success" @click="changeStatus" :disabled="!state.send_valid">
            {{state.button_text}}
        </n-button>
        <n-grid y-gap="20" :cols=1 style="margin-top:15%">
            <n-grid-item >
                <n-grid cols="3" item-responsive>
                    <n-grid-item style="text-align:center">
                        <n-h3>
                            <n-text type="info">
                                用户名
                            </n-text>
                        </n-h3>
                    </n-grid-item>
                    <n-grid-item style="text-align:left"  span="1 300:2">
                        <n-h3 v-if="state.edit_status == false">
                            <n-text>
                                {{props.user.user_name}}
                            </n-text>
                        </n-h3>
                        <div v-else>
                            <n-input v-model:value="state.user.user_name" placeholder="请输入用户名" :on-blur="checkUsername"/>
                            <n-text v-if="state.user.user_valid == false" style="color:red">
                                用户名不符合格式(用户名允许中文+英文+特殊字符+数字，必须以中文或英文开头，特殊字符包括‘_’与‘-’。长度不超过14位)
                            </n-text>
                        </div>
                    </n-grid-item>
                </n-grid>
            </n-grid-item>
            <n-grid-item>
                <n-grid cols="3" item-responsive>
                    <n-grid-item style="text-align:center">
                        <n-h3> 
                            <n-text  type="error">
                                个性签名
                            </n-text>
                        </n-h3>
                    </n-grid-item>
                    <n-grid-item style="text-align:left"  span="1 300:2">
                        <n-h3 v-if="state.edit_status == false">
                            <n-text>
                                {{props.user.signature}}
                            </n-text>
                        </n-h3>
                        <div v-else>
                            <n-input v-model:value="state.user.signature" placeholder="请输入个人签名" :on-blur="checkSignature"/>
                            <n-text v-if="state.user.sign_valid == false" style="color:red">
                                个人签名不符合格式（个性签名长度不超过50）
                            </n-text>
                        </div>
                    </n-grid-item>
                </n-grid>
            </n-grid-item>
            <n-grid-item>
                <n-grid cols="3" item-responsive>
                    <n-grid-item style="text-align:center">
                        <n-h3>
                            <n-text type="success">
                                邮箱
                            </n-text>
                        </n-h3>
                    </n-grid-item>
                    <n-grid-item style="text-align:left"  span="1 300:2">
                        <n-h3 v-if="state.edit_status == false">
                            <n-text>
                                {{props.user.mail}}
                            </n-text>
                        </n-h3>
                        <div v-else>
                            <n-input v-model:value="state.user.mail" placeholder="请输入邮箱" :on-blur="checkMail"/>
                            <n-text v-if="state.user.mail_valid == false" style="color:red">
                                邮箱不符合格式
                            </n-text>
                        </div>
                        
                    </n-grid-item>
                </n-grid>
            </n-grid-item>
        </n-grid>
    </n-card>
    
</template>

<script setup lang="ts">
import { defineProps, reactive,ref,defineEmits } from 'vue'
import {NH3,NText,NCard,NGrid,NGridItem,NButton,NInput} from 'naive-ui'
import API from '@/store/axiosInstance'
export interface UserInfo {
  id: string,
  user_name: string,
  signature: string,
  tags: {},
  mail: string,
  avatar: string,
}
const props = defineProps<{
  user:UserInfo,
}>();
const emits = defineEmits(['change-info','change-avatar']);

const state = reactive({
    edit_status:false,
    button_text:'编辑信息', 
    user: {
        mail:ref(null), 
        signature:ref(null), 
        user_name:ref(null),
        mail_valid:false,
        user_valid:false,
        sign_valid:false,
    },
    send_valid:true,
})

function initModify(){
    state.user.mail = ref(props.user.mail)
    state.user.signature = ref(props.user.signature)
    state.user.user_name = ref(props.user.user_name)
    if ((state.user.signature == "" || state.user.signature == null || state.user.signature == undefined)) {
        state.user.signature = "这个人很懒，什么都没留下"
    }
}

function returnInfo(){
    state.edit_status = false
    state.button_text = '编辑信息'
    state.send_valid = true
}

function changeStatus(){
    if(state.edit_status == false) {
        state.send_valid = true
        state.edit_status = true
        state.button_text = '保存'
        initModify()
        checkMail()
        checkSignature()
        checkUsername()
        checkSend()
    }
    else {
        API({
            headers:{"Authorization": window.localStorage.getItem("token")},
            url:'modifyuserinfo', 
            method:'post',
            data:{
                new_user_name: state.user.user_name,
                signature: state.user.signature,
                mail: state.user.mail,
            }
            // 根据不同类别，把类别放在了对应的请求参数中
        }).then((res)=>{
            console.log(res)
            state.edit_status = false
            state.button_text = '编辑信息'
            emits("change-info", state.user.user_name, state.user.signature, state.user.mail)
            alert("修改成功")
        }).catch((error) => {
            console.log(error);
            alert("修改失败")
        });
        // 发送接口
    }
}

function checkUsername() {
    if (!(state.user.user_name == "" || state.user.user_name == null || state.user.user_name == undefined)) {
        state.user.user_name = state.user.user_name.trim()
        const now_name = state.user.user_name
        state.user.user_valid = /^[A-Za-z\u4e00-\u9fa5][-A-Za-z0-9\u4e00-\u9fa5_]*$/.test(now_name)
        checkSend()
        return;
    }
    state.user.user_valid = false
    state.send_valid = false
}

function checkMail(){
    var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    console.log(now_mail)
    if (!(state.user.mail == "" || state.user.mail == null || state.user.mail == undefined)) {
        state.user.mail = state.user.mail.trim()
        var now_mail = state.user.mail
        state.user.mail_valid =  reg.test(now_mail); //符合条件与否
        checkSend()
        return;
    }
    state.user.mail_valid = true; //允许为空
    checkSend()
}

function checkSignature() {
    if (!(state.user.signature == "" || state.user.signature == null || state.user.signature == undefined)) {
        state.user.signature = state.user.signature.trim()
        var now_signature = state.user.signature
        console.log(now_signature)
        state.user.sign_valid = now_signature.length <= 50 
        checkSend()
        return;
    }
    state.user.sign_valid = true
    checkSend()
}

function checkSend(){
    if(state.user.sign_valid && state.user.mail_valid && state.user.user_valid) {
        state.send_valid = true
    }
    else {
        state.send_valid = false
    }
}


</script>

<style scoped>

</style>