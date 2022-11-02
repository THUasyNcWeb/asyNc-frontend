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
import selectMore from '@/components/selectMore.vue';
import { 
    NTabs,
    NTabPane,
} from 'naive-ui'
// 按需引入naive-ui组件
// 之后可能会把上述引入集中在一个固定的ts文件中


const state = reactive({all_news: new Array(),
    window_width:window.innerWidth * 0.35, 
    all_category:new Array(), 
    // 所有的分类
    now_category:"home",
    // 当前分类的key 
    more_label:'更多',
    more_key:'more',
    // 更多栏的显示标签与对应的键值
})

// change the offset dynamically
window.onresize = () => {
    state.window_width = window.innerWidth * 0.35
}

state.all_category.push(
    {key:'home', label:'首页'},
    {key:'ent', label:'娱乐'},
    {key:'sports', label:'体育'},
    {key:'politics', label:'政治'},
    {key:'tech', label:'科技'},
)
get_news("home")

function get_news(category:string) {
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

function main_news(content:string){
    return h('div', {
        onClick:() => {
            state.more_label = '更多'
            state.more_key = 'more'
        },
        innerHTML: content
    })
    // 点击其他栏目时，自动恢复回“更多”的字样
}

function more_news(){
    return h('div', state.more_label)   
}

function selectNews(news, category:string, label:string){
    state.all_news = news
    var whether_main:boolean = false
    // 检查是否点击了主栏目还是扩展栏目
    for(var x of state.all_category) {
        if(category == x.key) {
            whether_main = true
            break
        }
    }
    if(whether_main == false) {
        // 若点击了扩展栏目，则修改更多栏目的显示为该扩展栏目的类别
        state.more_label = label
        state.more_key = category
    }
    state.now_category = category
    // 更新当前的类别
}

</script>
  
<template>
    <body>
        <n-tabs :value="state.now_category" 
        @update:value="state.now_category=$event;get_news(state.now_category)" 
        type="line" animated :tabs-padding=state.window_width 
        pane-style="margin-left:20%;margin-right:20%"
        size="large" default-value="home">
            <n-tab-pane v-for="item in state.all_category" :key="item.key" :name=item.key :tab=main_news(item.label)>
                <NewsCategory :news="state.all_news"/>
            </n-tab-pane>
            <n-tab-pane :name="state.more_key" :tab=more_news>
                <div v-if="state.more_label=='更多'" style="width:60%">
                    <selectMore :mainCategory="state.all_category" @updateCategory="selectNews"/>
                </div>
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