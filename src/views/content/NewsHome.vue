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
import { Search } from '@vicons/ionicons5/'
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
    NIcon,
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
        NCarouselItem,
        Search,
        NIcon,
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
            <div style="text-align:center">
                <n-gradient-text type="success" size=24 style="margin-right: 20px;">
                    asyNc
                </n-gradient-text>
                <n-input style="width:60%; margin-right: 5%; text-align: left;" size="large" round placeholder="百度一下，我也不知道">
                    <template #suffix>
                        <n-button size="large" large circle quaternary type="primary">
                                <n-icon size="large">
                                    <Search/>
                                </n-icon>
                        </n-button>
                    </template>
                </n-input>

            </div>
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
  
<style scoped>

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
    background-color: #E6E6E6;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='634' height='634' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%2347A5C2' stroke-width='1.8'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23235055'%3E%3Ccircle cx='769' cy='229' r='6'/%3E%3Ccircle cx='539' cy='269' r='6'/%3E%3Ccircle cx='603' cy='493' r='6'/%3E%3Ccircle cx='731' cy='737' r='6'/%3E%3Ccircle cx='520' cy='660' r='6'/%3E%3Ccircle cx='309' cy='538' r='6'/%3E%3Ccircle cx='295' cy='764' r='6'/%3E%3Ccircle cx='40' cy='599' r='6'/%3E%3Ccircle cx='102' cy='382' r='6'/%3E%3Ccircle cx='127' cy='80' r='6'/%3E%3Ccircle cx='370' cy='105' r='6'/%3E%3Ccircle cx='578' cy='42' r='6'/%3E%3Ccircle cx='237' cy='261' r='6'/%3E%3Ccircle cx='390' cy='382' r='6'/%3E%3C/g%3E%3C/svg%3E");
    background-position: center;
    /*  z-index:1; */
    position: fixed;
    width: 100%;
    height: 100vh;
    overflow: auto;
}

.card_bordered {
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