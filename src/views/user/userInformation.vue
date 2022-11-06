<!--
 * @FileDescription: 用户信息界面
 * @Author: 郑友捷
 * @Date: 2022-10-08 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 10:31
 -->
<template>
    <n-card class="card_bordered">
        <n-button v-if="state.edit_status==true" style="float:left" type="warning" @click="state.edit_status = false" >
            返回
        </n-button>
        <n-button style="float:right" type="success" @click="changeStatus">
            {{state.button_text}}
        </n-button>
        <n-grid y-gap="20" :cols=1>
            <n-grid-item>
                <n-grid cols="3" item-responsive>
                    <n-grid-item style="text-align:center;">
                        <n-h3 style="padding-top:5%">
                            <n-text type="warning">
                                头像
                            </n-text>
                        </n-h3>
                    </n-grid-item>
                    <n-grid-item style="text-align:left"  span="1 300:2">
                        <UserAvatar :width="120" :height="120" :image_code="props.user.avatar"></UserAvatar>
                    </n-grid-item>
                </n-grid>
            </n-grid-item>
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
                        <n-input v-else  v-model:value="state.user.user_name" placeholder="请输入用户名"/>
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
                        <n-input v-else v-model:value="state.user.signature" placeholder="请输入个人签名"/>
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
                        <n-input v-else v-model:value="state.user.mail" placeholder="请输入邮箱"/>
                    </n-grid-item>
                </n-grid>
            </n-grid-item>
            <n-grid-item  v-if="state.edit_status == false">
                <n-grid cols="3" item-responsive>
                    <n-grid-item style="text-align:center">
                        <n-h3>
                            <n-text>
                                近期浏览
                            </n-text>
                        </n-h3>
                    </n-grid-item>
                    <n-grid-item style="text-align:left"  span="1 300:2">
                        <n-space>    
                            <n-tag :color="{ color: color_tags[index % 3], textColor: '#000', borderColor: '#555' }" v-for="(tag,index) in props.user.tags" :key="index" style="margin-right:10px;" >{{tag}}</n-tag>
                        </n-space>
                    </n-grid-item>
                </n-grid>
            </n-grid-item>
        </n-grid>
    </n-card>
    
</template>

<script setup lang="ts">
import { defineProps, reactive,ref } from 'vue'
import {NTag, NSpace,NH3,NText,NCard,NGrid,NGridItem,NButton,NInput} from 'naive-ui'
import UserAvatar from '@/components/UserAvatar.vue';
import API from '../../store/axiosInstance'
export interface UserInfo {
  id: string,
  user_name: string,
  signature: string,
  tags: string[],
  mail: string,
  avatar: string,
}
const props = defineProps<{
  user:UserInfo,
}>();

const state = reactive({edit_status:false, button_text:'编辑信息', user: {mail:ref(null), signature:ref(null), user_name:ref(null)}})

state.user.mail = ref(props.user.mail)
state.user.signature = ref(props.user.signature)
state.user.user_name = ref(props.user.user_name)

const color_tags = ['#00FFFF','#ADFF2F','#F0E68C']
// 获取用户信息 

function changeStatus(){
    if(state.edit_status == false) {
        state.edit_status = true
        state.button_text = '保存'
    }
    else {
        API({
            headers:{"Authorization": window.localStorage.getItem("token")},
            url:'modifyinfo', 
            method:'post',
            data:{
                old_user_name: props.user.user_name,
                new_user_name: state.user.user_name,
                signature: state.user.signature,
                mail: state.user.mail,
            }
            // 根据不同类别，把类别放在了对应的请求参数中
        }).then((res)=>{
            console.log(res)
            state.edit_status = false
            state.button_text = '编辑信息'
            alert("修改成功")
        }).catch((error) => {
            console.log(error);
            alert("修改失败")
        });
        // 发送接口
    }
}


</script>

<style scoped>
.card_bordered {
    display: flex; 
    border-radius:15px;
    margin: auto; 
    /* margin-left: 50%; */
    width:70%;
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow:    0px -0.5px 5px #808080,   /*上边阴影 */
    -0.5px 0px 5px #808080,   /*左边阴影 */
    0.5px 0px 5px #808080,    /*右边阴影 */
    0px 0.5px 5px #808080;    /*下边阴影  */
}
.img_div {
    display: block;
    position: relative;
    border-radius:50%; 
}
.mask {
position: absolute;
background: rgba(101, 101, 101, 0.6);
color: #ffffff;
opacity: 0;
top: 0;
right: 0;
width: 100%;
height: 100%;
border-radius: 150%;

}
.img_div:hover .mask {
opacity: 1;
}

</style>