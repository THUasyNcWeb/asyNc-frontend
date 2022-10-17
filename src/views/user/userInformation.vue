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
                {{now_username}}
                <!-- 用户名为动态，等待后端请求 -->
            </th>
        </tr>
        <tr>
            <th style="width:20%">
                个性签名
            </th>
            <th style="width:80%">
                {{sign}}
                <!-- 个性签名为动态，等待后端请求 -->
            </th>
        </tr>
        <tr>
            <th style="width:20%">
                最近浏览的新闻标签
            </th>
            <th style="width:80%">
                <n-tag :color="{ color: color_tags[index], textColor: '#000', borderColor: '#555' }" v-for="(tag,index) in tags" :key="index" style="margin-right:10px;" >{{tag}}</n-tag>
            </th>
            <!-- 浏览的新闻标签以tag组件进行展示，有着不同的颜色 -->
        </tr>
    </n-table>
</template>

<script lang="ts">
import {useRoute} from 'vue-router'
import {NTable,NTag} from 'naive-ui'
export default {
    components: {
        NTable,
        NTag,
    },
    setup() {
        const router = useRoute()
        var now_username:string
        if (typeof router.params.user_name == 'string') {
            now_username = router.params.user_name
        }
        else {
            now_username = router.params.user_name[0]
        }
        var tags:string[] = ['原神','新冠疫情','清华']
        // 最近浏览的新闻标签，之后会通过接口和后端对接
        var color_tags:string[] = ['#00FFFF','#ADFF2F','#F0E68C']
        // 标签的颜色数组
        return {
            tags,
            now_username,
            color_tags,
            sign:'永遠に宵宮が好き',
            // 个性签名
        }
    }
}
</script>

<style>

</style>