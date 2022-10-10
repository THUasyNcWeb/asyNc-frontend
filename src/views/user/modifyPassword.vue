<!--
 * @FileDescription: 修改密码页面
 * @Author: 郑友捷
 * @Date: 2022-10-08 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-08 17:00
 -->
<template>
    <div style="top:50px">
        <n-H1>
            请设置新密码
        </n-H1>
        <n-H5>
            用户名
        </n-H5>
        <n-input style="width:100%">
            请输入用户名
        </n-input>
        <n-H5>
            密码
        </n-H5>
        <n-input style="width:100%;">
            请输入密码
        </n-input>
        <n-button style="margin-top: 10px;">
            确定
        </n-button>
        <!-- 确定修改密码，向后端发送请求 -->
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import {NH1, NH5, NInput,NButton} from 'naive-ui'
export default {
    components:{
        NH1,
        NH5,
        NInput,
        NButton,
    },
    setup() {
        const router = useRoute()
        const now_username = router.params.user_name
        // 获取props
        return {
            now_username
        }
    }
}
</script>

<style>

</style>