<!--
 * @FileDescription: 新闻搜索与展示主页
 * @Author: 郑友捷
 * @Date: 2022-10-03 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 10:07  
 -->

<script lang="ts">
import { defineComponent} from 'vue'
import API from "../../store/axiosInstance"
import { 
    NCard,
    NInput, 
    NButton, 
    NInputGroup,
    NH2,
    NGrid,
    NGridItem,
    NCarousel,
    NCarouselItem,
    } from 'naive-ui'
    // 按需引入naive-ui组件
    // 之后可能会把上述引入集中在一个固定的ts文件中
export default defineComponent({
    components: {
        NCard,
        NInput,
        NInputGroup,
        NButton,
        NH2,
        NGrid,
        NGridItem,
        NCarousel,
        NCarouselItem
    },
    // 引入naive ui组件
    
    setup() {
        const all_news = [
            {
                "title": "重要通知：清华大学国庆假期长达七天",
                "content":"据记者了解，清华大学2022年国庆假期竟达到了前所未有的七天，众多清华学子欢欣鼓舞，盛赞学校的英明领导。",
                "picture_url":"https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg",
                "news_url":"https://www.bilibili.com/video/BV1GJ411x7h7/?spm_id_from=333.788.recommend_more_video.0&vd_source=5c99d5fcb99970c9ff78540c60815ff7",
            },
            {
                "title": "“一见清心”新生舞会将于本周日举办",
                "content":"据记者了解，清华大学一字班延期一年的新生舞会将于2022年10月10日（即本周日）与二字班新生一同举办，众多一字班老生摩拳擦掌，想要与二字班新生一决高下。",
                "picture_url":"https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg",
                "news_url":"https://www.bilibili.com/video/BV1uT4y1P7CX/?spm_id_from=333.788.recommend_more_video.5&vd_source=5c99d5fcb99970c9ff78540c60815ff7",
            },
            {
                "title": "Program Buddy活动即将举行，参与人员男女比例令人落泪",
                "content":"2022年秋季学期Program Buddy活动即将举行，据内部人员了解，志愿者更希望自己用于女性同伴，优先选择男性同伴的志愿者竟只有五人。",
                "picture_url":"https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg",
                "news_url":"https://www.bilibili.com/video/BV1AK411g7xc/?spm_id_from=333.788.recommend_more_video.2&vd_source=5c99d5fcb99970c9ff78540c60815ff7",
            }
        ]
        // 存储主页默认新闻内容
        // 目前暂未与后端进行对接，故新闻内容直接写死
        // 读取存储在localStorage中的token，从而得知初始化应当自动登录的用户
        // 存储主页显示的用户名
        function getNews() {
            /**
            * @description: 获取全局主页新闻
            * @return {void}
            */
            API({
                headers:{"Authorization": window.localStorage.getItem("token")},
                url:'all_news/',
                method:'get',
            }).then((res)=>{
                console.log(res);
            });
        }
        return {
            getNews,
            all_news,
        }
    },
})
</script>
  
<template>
    <body>
        <n-card class="card_bordered">
            <!-- 布置搜索框组件，包括图片、搜索框与帮助按钮 -->
            <img :src="require(`@/assets/log-news.png`)"
                style="height:40px;weight:30px;margin-right: 10px;vertical-align: -50%;display: inline-block;" />
            <n-input-group style="display: inline-block;width: 80%;">
                <n-input style="width:80%;border-radius: 0%;" placeholder="百度一下，我也不知道">
                </n-input>
                <n-button style=" border-radius: 0%;  background: blue; height: 36px;margin-right: 10px;"
                    text-color="white">
                    百度一下
                </n-button>
                <a href="http://www.baidu.com">帮助</a>
                <!-- 绑定为一个组，从而使排版成为一个整体 -->
            </n-input-group>
        </n-card>
        <!-- 展示主页新闻内容 -->
        <n-card class="card_bordered">  
            <n-grid cols="2" item-responsive>
                <n-grid-item style="text-align:left">
                    <svg class="title_line" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <line x1="0" y1="0" x2="0" y2="25" style="stroke:#00008B; stroke-width:2"></line>
                    </svg>
                    <n-h2 class="title_content">
                        热点新闻
                    </n-h2>
                    <li v-for="(news, index) in all_news" :key = index style="margin-top:5px">
                        <a :href="news.news_url" target="_blank">
                            {{news.title}}
                        </a>
                    </li>
                </n-grid-item>
                <n-grid-item style="text-align:left">
                    <svg class="title_line" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <line x1="0" y1="0" x2="0" y2="25" style="stroke:#00008B; stroke-width:2"></line>
                        </svg>
                        <n-h2 class="title_content">
                            图片新闻
                        </n-h2>
                    <n-carousel autoplay style="height:80%" dot-type="line" dot-placement="right">
                        <n-carousel-item v-for="(news, index) in all_news" :key = index>
                            <div class="pic_item">
                                <img class="small" :src="news.picture_url" />
                                <h3>{{news.title}}</h3>
                            </div>
                        </n-carousel-item>
                    </n-carousel>
                </n-grid-item>
            </n-grid>
        </n-card>

        <n-card class="card_bordered">  
            <n-grid cols="2" item-responsive>
                <n-grid-item style="text-align:left">
                    <svg class="title_line" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <line x1="0" y1="0" x2="0" y2="25" style="stroke:#00008B; stroke-width:2"></line>
                    </svg>
                    <n-h2 class="title_content">
                        军事
                    </n-h2>
                    <li v-for="(news, index) in all_news" :key = index style="margin-top:5px">
                        <a :href="news.news_url" target="_blank">
                            {{news.title}}
                        </a>
                    </li>
                </n-grid-item>
                <n-grid-item style="text-align:left">
                    <svg class="title_line" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <line x1="0" y1="0" x2="0" y2="25" style="stroke:#00008B; stroke-width:2"></line>
                        </svg>
                        <n-h2 class="title_content">
                            图片新闻
                        </n-h2>
                    <n-carousel autoplay style="height:80%" dot-type="line" dot-placement="right">
                        <n-carousel-item v-for="(news, index) in all_news" :key = index>
                            <div class="pic_item">
                                <img class="small" :src="news.picture_url" />
                                <h3>{{news.title}}</h3>
                            </div>
                        </n-carousel-item>
                    </n-carousel>
                </n-grid-item>
            </n-grid>
        </n-card>
        <div v-for="(news, index) in all_news" :key = index style="margin-bottom:20px;margin-top:50px;text-align:left">
            <n-card class="card_bordered">
                <div v-if="news.picture_url != ''">
                    <!-- 若新闻带有头图，则布置栅格插件来分布图片与文案 -->
                    <n-grid cols="4" item-responsive>
                        <n-grid-item span="0 400:1 600:2 800:3">
                            <div>
                                <!-- 插入新闻链接与文本 -->
                                <a :href="news.news_url" target="_blank">
                                    <n-h3 style="text-align:left">
                                        {{news.title}}
                                    </n-h3>
                                </a>
                                <div style="text-align:left">
                                    {{news.content}}
                                </div>
                            </div>
                        </n-grid-item>
                        <n-grid-item>
                            <n-image :src = "news.picture_url" :fallback-src = news.picture_url width=100 />
                        </n-grid-item>
                    </n-grid>
                </div>
                <div v-else>
                    <div>
                        <a :href="news.news_url" target="_blank">
                            <n-h3 style="text-align:left">
                                {{news.title}}
                            </n-h3>
                        </a>
                        <div style="text-align:left">
                            {{news.content}}
                        </div>
                    </div>
                </div>
            </n-card>
        </div>   
        <div style="width:100%;height:30px; background-color:blue;color:white;text-align: center;">
            copyright by asyNc
        </div>      
    </body>
    
</template>
  
<style>
body {
    margin: 0;
    padding: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.main_card {
    background: white;
    margin: auto;
    max-width: 70%;
    margin-top: 80px;
    border-radius: 0%;
}

.title_line{
    width:10px;
    height:25px;
    display: inline-block;
}

.title_content{
    margin-top: -5px;
    color:blue;
    font-family:Arial;
    display: inline-block;
    vertical-align: top;
}

.background {
    /* 规定背景图片 */
    background: url("@/assets/background.jpg");
    width: 100%;
    height: 100vh;
    background-size: 100% 100%;
    position: fixed;
    overflow: auto
    /* 保证背景可以滑动 */
}

.card_bordered {
    display: flex; 
    text-align: center;
    border-radius:15px;
    width:80%;
    margin: auto; 
    margin-top: 5%;
    box-shadow:    0px -0.5px 5px #808080,   /*上边阴影  红色*/
    -0.5px 0px 5px #808080,   /*左边阴影  绿色*/
    0.5px 0px 5px #808080,    /*右边阴影  蓝色*/
    0px 0.5px 5px #808080;    /*下边阴影  黄色*/
}
.carousel-img {
  width: 100%;
  height: 100%;
  position: relative;
  /* object-fit: cover; */
}

.pic_item {
  position: relative;
  height: 100%;
}
.pic_item:hover{
  cursor: pointer;
}

.pic_item img {
  width: 100%;
  height: 100%;
}

.pic_item h3 {
  position: absolute;
  left: 1rem;
  bottom: -0.5rem;
  color: white;
}
</style>