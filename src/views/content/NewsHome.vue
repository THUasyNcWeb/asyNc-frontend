<!--
 * @FileDescription: 新闻搜索与展示主页
 * @Author: 郑友捷
 * @Date: 2022-10-03 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 10:07  
 -->

<script setup lang="ts">
import { reactive } from 'vue';
// import '@/mock/SearchPage.mock';
import API from "../../store/axiosInstance"
import { 
    NCard,
    NH2,
    NH3,
    NGrid,
    NGridItem,
    NCarousel,
    NCarouselItem,
    NText,
    NImage,
} from 'naive-ui'
// 按需引入naive-ui组件
// 之后可能会把上述引入集中在一个固定的ts文件中
const state = reactive({all_news: new Array(), category_index: new Map(), category_word: []})
API({
    headers:{"Authorization": window.localStorage.getItem("token")},
    url:'all_news/',
    method:'get',
}).then((res)=>{
    // console.log(res);
    for(let single_new of res.data.data) {
        var now_category = "";
        if(typeof(single_new.category) == "object"){
            now_category = single_new.category["0"] as string

        }
        else if(typeof(single_new.category) == "string") {
            now_category = single_new.category
        }
        if(now_category == "") {
            now_category = "杂项"
        }
        if(state.category_index.has(now_category) == false) {
            state.category_index.set(now_category,state.all_news.length)
            state.category_word[state.all_news.length] = now_category
            state.all_news.push({word_new: new Array(), picture_new: new Array()})
        }
        state.all_news[state.category_index.get(now_category)].word_new.push({
            picture_url:single_new.picture_url,
            priority:single_new.priority,
            title:single_new.title,
            url: single_new.url, 
        })
        if(single_new.picture_url!='') {
            state.all_news[state.category_index.get(now_category)].picture_new.push({
                picture_url:single_new.picture_url,
                url: single_new.url,
                title:single_new.title,
            })
        }
    console.log(state.all_news)
    // console.log(state.picture_news)
}}).catch((error) => {
    console.log(error);
}) ;

</script>
  
<template>
    <body class="background_image">
        <n-card v-for="(category_news, index) in state.all_news" :key="index" class="news_bordered"> 
            <n-grid cols="2" item-responsive>
                <n-grid-item style="text-align:left">
                    <n-h2 prefix="bar">
                        <n-text type="primary">
                            {{state.category_word[index]}}
                        </n-text>
                    </n-h2>
                    <div v-for="(news, index) in category_news.word_new" :key = index style="margin-top:5px">
                        <n-h3 prefix="bar" type="info">
                            <a :href="news.url" target="_blank" style="text-decoration-line: none">
                                {{news.title}}
                            </a>
                        </n-h3>
                    </div>
                </n-grid-item>
                <n-grid-item style="text-align:left" v-if="category_news.picture_new.length != 0">
                    <n-h2 prefix="bar" type="info">
                        <n-text type="info">
                            图片新闻
                        </n-text>
                    </n-h2>
                    <n-carousel style=" height:400px ;" autoplay dot-type="line">
                        <n-carousel-item v-for="(news, pic_index) in category_news.picture_new" :key = pic_index>
                            <div class="pic_item">
                                <a :href="news.url" target="_blank">
                                    <n-image width=650 height=400 object-fit="cover"
                                        :src="news.picture_url" preview-disabled
                                        style="border-radius: 8px; box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, .16)"/>
                                </a>
                                <h2 style="color:black">{{news.title}}</h2>
                            </div>
                        </n-carousel-item>
                    </n-carousel>
                </n-grid-item>
            </n-grid>
        </n-card>
        <div style="width:100%;height:30px; background-color:blue;color:white;text-align: center;">
            copyright by asyNc
        </div>      
    </body>
    
</template>
  
<style scoped>

.title_line{
    width:10px;
    height:25px;
    display: inline-block;
}


.background_image {
    background-color: #E6E6E6;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='634' height='634' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%2347A5C2' stroke-width='1.8'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23235055'%3E%3Ccircle cx='769' cy='229' r='6'/%3E%3Ccircle cx='539' cy='269' r='6'/%3E%3Ccircle cx='603' cy='493' r='6'/%3E%3Ccircle cx='731' cy='737' r='6'/%3E%3Ccircle cx='520' cy='660' r='6'/%3E%3Ccircle cx='309' cy='538' r='6'/%3E%3Ccircle cx='295' cy='764' r='6'/%3E%3Ccircle cx='40' cy='599' r='6'/%3E%3Ccircle cx='102' cy='382' r='6'/%3E%3Ccircle cx='127' cy='80' r='6'/%3E%3Ccircle cx='370' cy='105' r='6'/%3E%3Ccircle cx='578' cy='42' r='6'/%3E%3Ccircle cx='237' cy='261' r='6'/%3E%3Ccircle cx='390' cy='382' r='6'/%3E%3C/g%3E%3C/svg%3E");
    background-position: center;
    /*  z-index:1; */
    position: fixed;
    width: 100%;
    height: 100vh;
    overflow: auto;
}

.news_bordered {
    display: flex; 
    border-radius:15px;
    width:80%;
    margin: auto; 
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow:    0px -0.5px 5px #808080,   /*上边阴影 */
    -0.5px 0px 5px #808080,   /*左边阴影 */
    0.5px 0px 5px #808080,    /*右边阴影 */
    0px 0.5px 5px #808080;    /*下边阴影  */
}

.pic_item:hover{
  cursor: pointer;
}

.pic_item h2 {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  color: white;
}
</style>