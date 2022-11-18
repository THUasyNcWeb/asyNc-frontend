<!--
 * @FileDescription: 用户信息界面
 * @Author: 郑友捷
 * @Date: 2022-10-08 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 10:31
 -->
<template>
  <n-card :bordered="true" size="large" class="card_border" style="width:100%">
    <n-grid :item-responsive="true" :x-gap="16" :y-gap="16">
      <n-grid-item span="0:24 640:24 1024:24">
        <n-space justify="space-between" :size=50>
          <n-h2>
            {{state.title}}
          </n-h2>
          <n-space>
            <n-button v-if="state.edit_status==true" style="border-radius: 20px;font-size:20px" type="warning" @click="returnInfo" >
              返回
            </n-button>
            <n-button style="border-radius: 20px;font-size:15px" type="success" @click="changeStatus" :disabled="!state.send_valid">
              {{state.button_text}}
            </n-button>
          </n-space>
        </n-space> 
      </n-grid-item>
      <n-grid-item span="0:24 640:10 1024:10">
        <!-- <n-card class="card_border" style="width: 100%;"> -->
          <n-space :vertical="true" >
            <n-space>
              <n-icon :size="25">
                <PersonOutline />
              </n-icon>
              <n-text style="font-size:18px">
                用户名
              </n-text>
            </n-space>
            <n-input :disabled="!state.edit_status" v-model:value="state.user.user_name" placeholder="请输入用户名" :on-blur="checkUsername"/>
            <n-text v-if="state.user.user_valid == false" style="color:red">
              用户名不符合格式
            </n-text>
          </n-space>
        <!-- </n-card> -->
      </n-grid-item>
      <n-grid-item span="0:24 640:14 1024:14">
        <!-- <n-card class="card_border" style="width: 100%;"> -->
          <n-space :vertical="true" >
            <n-space>
              <n-icon :size="25">
                <MailOutline />
              </n-icon>
              <n-text style="font-size:18px">
                邮箱
              </n-text>
            </n-space>
            <n-input :disabled="!state.edit_status" v-model:value="state.user.mail" placeholder="请输入邮箱" :on-blur="checkMail"/>
            <n-text v-if="state.user.mail_valid == false" style="color:red">
              邮箱不符合格式
            </n-text>
          </n-space>
      </n-grid-item>
      <n-grid-item span="0:24 640:24 1024:24">
          <n-space :vertical="true" >
            <n-space>
              <n-icon :size="25">
                <PencilOutline />
              </n-icon>
              <n-text style="font-size:18px">
                个性签名
              </n-text>
            </n-space>
            <n-input type="textarea" :autosize="{
              minRows: 1,
              maxRows: 3
            }" 
            :disabled="!state.edit_status" v-model:value="state.user.signature" placeholder="请输入个人签名" :on-blur="checkSignature"/>
            <n-text v-if="state.user.sign_valid == false" style="color:red">
              个人签名不符合格式（个性签名长度不超过50）
            </n-text>
          </n-space>
      </n-grid-item>
      <n-grid-item span="0:24 640:24 1024:24">
        <n-space>
          <n-icon :size="25">
            <EyeOutline />
          </n-icon>
          <n-text style="font-size:18px">
            最近浏览
          </n-text>
        </n-space>
        <WordChart :tags="props.user.tags == undefined ? {} : props.user.tags"></WordChart>
      </n-grid-item>
    </n-grid>

  </n-card>
</template>

<script setup lang="ts">
import WordChart from './WordChart.vue';
import { PersonOutline,MailOutline,PencilOutline,EyeOutline } from '@vicons/ionicons5';
import { defineProps, reactive,ref,defineEmits,watch } from 'vue'
import {NText,NCard,NGrid,NGridItem,NButton,NInput,NSpace,NIcon,NH2} from 'naive-ui'
import API from '@/store/axiosInstance'
export interface UserInfo {
  id: string,
  user_name: string,
  signature: string,
  tags: object,
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
	title: "详细信息",
	user: {
		mail:ref(null), 
		signature:ref(null), 
		user_name:ref(null),
		mail_valid:true,
		user_valid:true,
		sign_valid:true,
	},
	send_valid:true,
})

initModify()
watch(
  () => props.user,
  () => {
    initModify()
  }
)
function initModify(){
	state.user.mail = ref(props.user.mail)
	state.user.signature = ref(props.user.signature)
	state.user.user_name = ref(props.user.user_name)
	if ((state.user.signature == "" || state.user.signature == null || state.user.signature == undefined)) {
		state.user.signature = "这个人很懒，什么都没留下"
	}
  state.user.mail_valid = true
  state.user.user_valid = true
  state.user.sign_valid = true
}

function returnInfo(){
	state.edit_status = false
	state.button_text = '编辑信息'
	state.title = '详细信息'
	state.send_valid = true
  initModify()
}

function changeStatus(){
	if(state.edit_status == false) {
		state.send_valid = true
		state.edit_status = true
		state.button_text = '保存'
		state.title = '编辑信息'
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
			state.title = '详细信息'
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

.card_border {
  border-radius: 20px;
  border-color: #000000;
  /* background-color: #F5F5F5; */
}

</style>