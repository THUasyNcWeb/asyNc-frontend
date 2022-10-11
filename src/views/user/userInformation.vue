<!--
 * @FileDescription: 用户信息界面
 * @Author: 郑友捷
 * @Date: 2022-10-08 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-08 17:00
 -->
<template>
    <n-table>
        <tr>
            <th style="width:20%">
                用户名
            </th>
            <th style="width:80%">
                {{now_username}}
            </th>
        </tr>
        <tr>
            <th style="width:20%">
                个性签名
            </th>
            <th style="width:80%">
                {{sign}}
            </th>
        </tr>
        <tr>
            <th style="width:20%">
                最近浏览的新闻标签
            </th>
            <th style="width:80%">
                <n-tag :color="{ color: color_tags[index], textColor: '#000', borderColor: '#555' }" v-for="(tag,index) in tags" :key="index" style="margin-right:10px;" >{{tag}}</n-tag>
            </th>
        </tr>
    </n-table>
</template>

<script>
import { useRoute } from 'vue-router'
import {NInput,NH1,NTable,NTag} from 'naive-ui'
export default {
    components: {
        NInput,
        NH1,
        NTable,
        NTag,
    },
    setup() {
        const router = useRoute()
        const now_username = router.params.user_name
        var tags = ['原神','新冠疫情','清华']
        // 最近浏览的新闻标签
        var color_tags = ['#00FFFF','#ADFF2F','#F0E68C']
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