<!--
 * @FileDescription: 用户信息界面
 * @Author: 郑友捷
 * @Date: 2022-10-08 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 10:31
 -->
<template>
    <n-table>
        <tr>
            <th style="width:20%">
                用户名
            </th>
            <th style="width:80%">
                {{username}}
                <!-- 用户名为动态，等待后端请求 -->
            </th>
        </tr>
        <tr>
            <th style="width:20%">
                个性签名
            </th>
            <th style="width:80%">
                {{state.sign}}
                <!-- 个性签名为动态，等待后端请求 -->
            </th>
        </tr>
        <tr>
            <th style="width:20%">
                最近浏览的新闻标签
            </th>
            <th style="width:80%">
                <n-tag :color="{ color: state.color_tags[index % 3], textColor: '#000', borderColor: '#555' }" v-for="(tag,index) in state.tags" :key="index" style="margin-right:10px;" >{{tag}}</n-tag>
            </th>
            <!-- 浏览的新闻标签以tag组件进行展示，有着不同的颜色 -->
        </tr>
    </n-table>
</template>

<script lang="ts">
import { reactive } from 'vue'
import {NTable,NTag} from 'naive-ui'
import API from "../../store/axiosInstance"
export default {
    components: {
        NTable,
        NTag,
    },
	props: {
		username: {
			type: String,
			default: () => ""
		},
	},
    created(){
        API({
            headers:{"Authorization": window.localStorage.getItem("token")},
            url:'user_info/',
            method:'get',
        }).then((res) => {
            console.log(res)
            this.tags = res.data.data.tags
            this.sign = res.data.data.signature
            console.log(this.sign)
        }).catch((error) => {
            console.log(error)
        })
    },
    setup() {

        const state = reactive({tags:[], color_tags: ['#00FFFF','#ADFF2F','#F0E68C'], sign:""})
        API({
            headers:{"Authorization": window.localStorage.getItem("token")},
            url:'user_info/',
            method:'get',
        }).then((res) => {
            console.log(res)
            state.tags = res.data.data.tags
            state.sign = res.data.data.signature
            console.log(state.sign)
        }).catch((error) => {
            console.log(error)
        })
        // 标签的颜色数组
        return {
            state
            // 个性签名
        }
    }
}
</script>

<style>

</style>