<!--
 * @FileDescription: 新闻搜索与展示主页
 * @Author: 郑友捷
 * @Date: 2022-10-03 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 10:07  
 -->

<script>
import { defineComponent, ref } from 'vue'
import Dialog from '@/components/InputDialog.vue'
import API from "../store/axiosInstance.js"
import { 
    NInput, 
    NLayoutHeader, 
    NCard, 
    NButton, 
    NDivider,
    NTooltip,
    NDialogProvider,
    NDropdown,
    NMessageProvider,
    NInputGroup,
    NH3,
    NImage,
    NGrid,
    NGridItem,
    } from 'naive-ui'
    // 按需引入naive-ui组件
    // 之后可能会把上述引入集中在一个固定的js文件中
export default defineComponent({
    components: {
        NInput,
        NInputGroup,
        NLayoutHeader,
        NCard,
        NButton,
        NDivider,
        NTooltip,
        NDialogProvider,
        NMessageProvider,
        Dialog,
        NDropdown,
        NH3,
        NImage,
        NGrid,
        NGridItem,
    },
    // 引入naive ui组件
    
    setup() {
        const all_news = [
            {
                "title": "重要通知：清华大学国庆假期长达七天",
                "content":"据记者了解，清华大学2022年国庆假期竟达到了前所未有的七天，众多清华学子欢欣鼓舞，盛赞学校的英明领导。",
                "picture_url":"//inews.gtimg.com/newsapp_bt/0/15313938517/1000",
                "news_url":"https://www.bilibili.com/video/BV1GJ411x7h7/?spm_id_from=333.788.recommend_more_video.0&vd_source=5c99d5fcb99970c9ff78540c60815ff7",
            },
            {
                "title": "“一见清心”新生舞会将于本周日举办",
                "content":"据记者了解，清华大学一字班延期一年的新生舞会将于2022年10月10日（即本周日）与二字班新生一同举办，众多一字班老生摩拳擦掌，想要与二字班新生一决高下。",
                "picture_url":"",
                "news_url":"https://www.bilibili.com/video/BV1uT4y1P7CX/?spm_id_from=333.788.recommend_more_video.5&vd_source=5c99d5fcb99970c9ff78540c60815ff7",
            },
            {
                "title": "Program Buddy活动即将举行，参与人员男女比例令人落泪",
                "content":"2022年秋季学期Program Buddy活动即将举行，据内部人员了解，志愿者更希望自己用于女性同伴，优先选择男性同伴的志愿者竟只有五人。",
                "picture_url":"//inews.gtimg.com/newsapp_bt/0/15313938517/1000",
                "news_url":"https://www.bilibili.com/video/BV1AK411g7xc/?spm_id_from=333.788.recommend_more_video.2&vd_source=5c99d5fcb99970c9ff78540c60815ff7",
            }
        ]
        // 存储主页默认新闻内容
        // 目前暂未与后端进行对接，故新闻内容直接写死
        const sonRef = ref(null)
        // 引入弹窗控件
        const username = ref("")
        // 当前页面的用户名（若已登录）
        if (sessionStorage.getItem('username') != null) {
            username.value = sessionStorage.getItem('username')
        }
        // 读取存储在localStorage中的token，从而得知初始化应当自动登录的用户
        // 存储主页显示的用户名
        function dialogHand (api){
            /**
            * @description: 弹出登录或注册接口
            * @param {string} api - 弹窗类型，可能为login或者register
            * @return void
            */
            sonRef.value.handleDialog(username, api) 
        }
        function handleSelect (key){
            /**
            * @description: 对用户名的下拉菜单的处理
            * @param {string} key - 选中的菜单值，如为edit则是退出登录，若是Home则出现用户管理界面
            * @return void
            */
            if(key == "exit") {
                window.localStorage.removeItem('token')
                sessionStorage.removeItem('username')
                username.value = ""
                // 若是退出登录界面，则关闭弹窗
            }
            else {
                //主要实现存储参数的功能
                sessionStorage.setItem("username", username.value);
                window.open('/user/userInformation/' + username.value, '_blank')
            }
        }
        function getNews() {
            /**
            * @description: 获取全局主页新闻
            * @return void
            */
            API({
                headers:{"Authorization": window.localStorage.getItem("token")},
                url:'all_news/',
                method:'get',
            }).then((res)=>{
                console.log(res);
            });
        }
        const options = [
            {
                label:"个人主页",
                key:"Home",
            },
            {
                label:"退出",
                key:"exit",
            }
        ]
        // 用户名对应的下拉菜单选项
        return {
            getNews,
            handleSelect,
            options,
            sonRef,
            dialogHand,
            all_news,
            username // 当前页面用户名
        }
    },
})
</script>
  
<template>
    <body>
        <n-dialog-provider> 
            <n-message-provider>
                <Dialog ref="sonRef"></Dialog>
            </n-message-provider>
        </n-dialog-provider>
        <!-- 布置弹窗子控件，并命名为sonRef -->
        <n-layout-header style="height:40px; background: white;text-align: right;">
            <!-- 布置顶部导航栏 -->
            <!-- 每一个按钮对应着相同的跳转网址 -->
            <div class="guide_button">
                <a href="http://www.baidu.com" target="_blank">
                    网页
                </a>
            </div>
            <div class="guide_button">
                <a href="http://news.baidu.com/" target="_blank">
                    新闻
                </a>
            </div>
            <div class="guide_button">
                <a href="https://tieba.baidu.com/index.html" target="_blank">
                    贴吧
                </a>
            </div>
            <div class="guide_button">
                <a href="https://zhidao.baidu.com/" target="_blank">
                    知道
                </a>
            </div>
            <div class="guide_button">
                <a href="http://music.91q.com/" target="_blank">
                    音乐
                </a>
            </div>
            <div class="guide_button">
                <a href="https://image.baidu.com/" target="_blank">
                    图片
                </a>
            </div>
            <div class="guide_button">
                <a href="https://v.xiaodutv.com/" target="_blank">
                    视频
                </a>
            </div>
            <div class="guide_button">
                <a href="https://map.baidu.com/" target="_blank">
                    地图
                </a>
            </div>
            <div class="guide_button">
                <a href="https://wenku.baidu.com/" target="_blank">
                    文库
                </a>
            </div>
            <n-divider :vertical=true />
            <div class="guide_button">
                <a href="http://www.baidu.com" target="_blank">
                    百度首页
                </a>
            </div>
            <div class="guide_button">
                <div v-if="username != ''">
                    <n-dropdown trigger = "hover" :options="options" @select="handleSelect">
                        <div class="guide_button">{{username}}</div>
                    </n-dropdown>
                </div>
                <!-- 若当前已登录，则显示登录的用户名并布置下拉菜单 -->
                <div v-else>
                    <n-button @click="dialogHand('login')" :bordered="false">
                        登录
                    </n-button>
                    <n-button @click="dialogHand('register')" :bordered="false">
                        注册
                    </n-button>
                </div>
                <!-- 若当前未登录，则布置登录按钮 -->
            </div>
            <n-tooltip :show-arrow="false" trigger="hover">
                <template #trigger>
                    <div class="guide_button">
                        百度新闻客户端
                    </div>
                </template>
                <img :src="require(`@/assets/log-news.png`)" style="height:50px;weight:30px" />
                <!-- 当鼠标移至该组件上方即可显示图片 -->
            </n-tooltip>
        </n-layout-header>
        <n-card class="background">
            <n-card class="main_card">
                <div>
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
                    
                </div>
                <!-- 展示主页新闻内容 -->
                    <div v-for="(news, index) in all_news" :key = index style="margin-bottom:20px;margin-top:50px;text-align:left">
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
                            <!-- 若仅有文案，则无需使用栅格 -->
                            <!-- 直接以div进行布置即可 -->
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
                    </div>           
            </n-card>
        </n-card>
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

.guide_button {
    margin-top: 5px;
    margin-right: 10px !important;
    /* 不同按钮之间须有一定间隔 */
    display: inline-block !important;
    /* 不同按钮需在同一行 */
}

.background {
    /* 规定背景图片 */
    background: url("../assets/background.jpg");
    width: 100%;
    height: 100vh;
    background-size: 100% 100%;
    position: fixed;
    overflow: auto
    /* 保证背景可以滑动 */
}
</style>