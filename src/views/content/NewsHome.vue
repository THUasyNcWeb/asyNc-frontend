<!--
 * @FileDescription: 新闻搜索与展示主页
 * @Author: 郑友捷
 * @Date: 2022-10-03 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 10:07  
 -->

<script setup lang="ts">
import { reactive } from 'vue';
import '@/mock/SearchPage.mock'
import API from "../../store/axiosInstance"
import NewsCategory from '@/components/NewsCategory.vue'
import { 
    NTabs,
    NTabPane,
} from 'naive-ui'
// 按需引入naive-ui组件
// 之后可能会把上述引入集中在一个固定的ts文件中
const state = reactive({all_news: new Array()})
API({
    headers:{"Authorization": window.localStorage.getItem("token")},
    url:'all_news/',
    method:'get',
}).then((res)=>{
    // console.log(res);
    state.all_news = res.data.data
    console.log(res)
    console.log(state.all_news)
}).catch((error) => {
    console.log(error);
}) ;

</script>
  
<template>
    <body>
        <n-tabs type="line" animated  :tabs-padding=600 pane-style="margin-left:20%;"  size="large" default-value="首页">
            <n-tab-pane v-for="item in state.all_news" :key="item" :name=item.category :tab=item.category>
                <NewsCategory :news="item.news"></NewsCategory>
            </n-tab-pane>
        </n-tabs>
    </body>
</template>
  
<style scoped>
.pane_border{
    position: absolute;
    margin: auto;
    display: flex; 
    width: 80%;
}

</style>