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


const state = reactive({all_news: new Array(),window_width:document.body.clientWidth * 0.4, all_category:new Array(), now_category:"home"})
// let router = useRouter()

state.all_category.push('home','genshin')

function get_news(category:string) {
    console.log(category)
    API({
        headers:{"Authorization": window.localStorage.getItem("token")},
        url:'all_news',
        params:{
            category: category
        },
        method:'get',
        // 根据不同类别，把类别放在了对应的请求参数中
    }).then((res)=>{
        state.all_news = res.data.data
        console.log(res)
        console.log(state.all_news)
    }).catch((error) => {
        console.log(error);
    });

}

// get_news('home')

</script>
  
<template>
    <body>
        <n-tabs :value="state.now_category" 
        @update:value="state.now_category = $event;get_news(state.now_category)" 
        type="line" animated :tabs-padding=state.window_width 
        pane-style="margin-left:20%;" 
        size="large" default-value="home">
            <n-tab-pane v-for="item in state.all_category" :key="item" :name=item :tab=item>
                <NewsCategory :news="state.all_news"/>
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