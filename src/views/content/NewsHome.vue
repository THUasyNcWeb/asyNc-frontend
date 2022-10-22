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
    NGradientText,
    NCard,
    NInput, 
    NButton, 
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
        NGradientText,
        NCard,
        NInput,
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
        function search() {
            API({
                headers:{"Authorization": window.localStorage.getItem("token")},
                url:'search/',
                method:'get',
            }).then((res)=>{
                console.log(res);
            });
        }
        return {
            getNews,
            all_news,
            search,
        }
    },
})
</script>
  
<template>
    <body class="background_image">
        <n-card class="card_bordered">
            <!-- 布置搜索框组件，包括图片、搜索框与帮助按钮 -->
            <n-gradient-text type="success" size=24 style="margin-right: 20px;">
                asyNc
            </n-gradient-text>
            <n-input style="width:60%; margin-right: 5%;" size="large" round placeholder="百度一下，我也不知道">
            </n-input>
            <template #prefix>
                <div>说话</div>
            </template>
            <template #suffix>
            <n-button type="primary">
                <!-- <n-icon size="large" :component="Search"/> -->
            </n-button>
            </template>

            <!-- <n-button style=" border-radius: 0%;  background: blue; height: 36px;margin-right: 10px;"
                text-color="white" @click="search">
                百度一下
            </n-button>
            <a href="http://www.baidu.com">帮助</a> -->
            <!-- 绑定为一个组，从而使排版成为一个整体 -->
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

.background_image {
    background-image:url('../../assets/background.jpg');
    background-repeat: no-repeat;
    background-position: center;
    /*  z-index:1; */
    position: fixed;
    width: 100%;
    height: 100vh;
    overflow: auto;
}

.card_bordered {
    display: flex; 
    text-align: center;
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