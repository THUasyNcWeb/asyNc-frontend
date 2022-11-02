<!--
 * @FileDescription: 新闻搜索与展示主页
 * @Author: 郑友捷
 * @Date: 2022-10-03 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 10:07  
 -->

<script setup lang="ts">
import { reactive,h } from 'vue';
import '@/mock/SearchPage.mock'
import API from "../../store/axiosInstance"
import NewsCategory from '@/components/NewsCategory.vue'
import moreTooltip from '@/components/moreTooltip.vue'
import selectMore from '@/components/selectMore.vue';
import { 
    NTabs,
    NTabPane,
    NSpace,
} from 'naive-ui'
// 按需引入naive-ui组件
// 之后可能会把上述引入集中在一个固定的ts文件中


const state = reactive({all_news: new Array(),
    window_width:window.innerWidth * 0.35, 
    all_category:new Array(), 
    now_category:"home", 
    more_content:'更多'})
// let router = useRouter()

// change the offset dynamically
window.onresize = () => {
    state.window_width = window.innerWidth * 0.35
}

state.all_category.push(
    {key:'home', label:'首页'},
    {key:'genshin', label:'原神'},
    {key:'tsinghua', label:'清华'},
    {key:'hometown', label:'家乡'},
    {key:'life', label:'生活'},
)
get_news("home")

function get_news(category:string) {
    console.log("参数列表")
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

function more_news(){
    return h(moreTooltip, {
        more_content:state.more_content,
    })
}

function selectNews(news, category:string, label:string){
    state.all_news = news
    var whether_main:boolean = false
    for(var x of state.all_category) {
        if(category == x.key) {
            whether_main = true
            break
        }
    }
    if(whether_main == false) {
        state.more_content = label
    }
    state.now_category = label
}

</script>
  
<template>
    <body>
        <n-tabs :value="state.now_category" 
        @update:value="state.now_category=$event;get_news(state.now_category)" 
        type="line" animated :tabs-padding=state.window_width 
        pane-style="margin-left:20%;"
        size="large" default-value="home">
            <n-tab-pane v-for="item in state.all_category" :key="item.key" :name=item.key :tab=item.label>
                <NewsCategory :news="state.all_news"/>
            </n-tab-pane>
            <n-tab-pane :name="state.more_content" :tab=more_news>
                <n-space v-if="state.more_content=='更多'" style="max-width:70%">
                    <selectMore :mainCategory="state.all_category" @updateCategory="selectNews"/>
                </n-space>
                <NewsCategory v-else :news="state.all_news"/>
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