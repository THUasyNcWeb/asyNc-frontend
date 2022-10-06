<!--
 * @FileDescription: 新闻搜索与展示主页
 * @Author: 郑友捷
 * @Date: 2022-10-03 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-03 14:11
 -->

<script>
import { defineComponent, ref } from 'vue'
import Dialog from '@/components/dialog.vue'
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
    } from 'naive-ui'
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
    },
    // 引入naive ui组件
    
    setup() {
        const sonRef = ref(null)
        // 引入弹窗空间
        const username = ref("")
        // 存储主页显示的用户名
        function dialogHand (api){
            // 打开登录弹窗
            sonRef.value.handleConfirm(username, api)
            // console.log(api)
        }
        function handleSelect (key){
            if(key == "edit") {
                username.value = ""
                // 若是退出登录界面，则关闭弹窗
            }
            else {
                // 等待跳转
            }
        }
        function getNews() {
            API({
                headers:{"Authorization": window.localStorage.getItem("token")},
                url:'all_news/',
                method:'get',
                // headers:{}
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
                key:"edit",
            }
        ]
        // 用户名对应的下拉菜单选项
        return {
            getNews,
            handleSelect,
            options,
            sonRef,
            dialogHand,
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
        <!-- 布置弹窗控件 -->
        <n-layout-header style="height:30px; background: white;text-align: right;">
            <n-button @click="getNews">
                测试
            </n-button>
            <div class="guide_button">
                <a href="http://www.baidu.com">
                    网页
                </a>
            </div>
            <div class="guide_button">
                <a href="http://news.baidu.com/">
                    新闻
                </a>
            </div>
            <div class="guide_button">
                <a href="https://tieba.baidu.com/index.html">
                    贴吧
                </a>
            </div>
            <div class="guide_button">
                <a href="https://zhidao.baidu.com/">
                    知道
                </a>
            </div>
            <div class="guide_button">
                <a href="http://music.91q.com/">
                    音乐
                </a>
            </div>
            <div class="guide_button">
                <a href="https://image.baidu.com/">
                    图片
                </a>
            </div>
            <div class="guide_button">
                <a href="https://v.xiaodutv.com/">
                    视频
                </a>
            </div>
            <div class="guide_button">
                <a href="https://map.baidu.com/">
                    地图
                </a>
            </div>
            <div class="guide_button">
                <a href="https://wenku.baidu.com/">
                    文库
                </a>
            </div>
            <n-divider :vertical=true />
            <div class="guide_button">
                <a href="http://www.baidu.com">
                    百度首页
                </a>
            </div>
            <div class="guide_button">
                <div v-if="username != ''">
                    <n-dropdown trigger = "hover" :options="options" @select="handleSelect">
                        <div class="guide_button">{{username}}</div>
                    </n-dropdown>
                </div>
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
                <img src="../assets/log-news.png" style="height:50px;weight:30px" />
            </n-tooltip>
        </n-layout-header>
        <n-card class="background">
            <n-card class="main_card">
                <div>
                    <img src="../assets/log-news.png"
                        style="height:40px;weight:30px;margin-right: 10px;vertical-align: -50%;display: inline-block;" />
                    <n-input-group style="display: inline-block;width: 600px;">
                        <n-input style="width:80%;border-radius: 0%;" placeholder="百度一下，我也不知道">
                        </n-input>
                        <n-button style=" border-radius: 0%;  background: blue; height: 36px;margin-right: 10px;"
                            text-color="white">
                            百度一下
                        </n-button>
                    </n-input-group>
                    <a href="http://www.baidu.com">帮助</a>
                </div>
                <div style="height:2000px;margin-top: 100px;">
                    重要新闻：清华大学国庆假期长达七天！
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
    display: inline-block !important;
}

.background {
    background: url("../assets/background.jpg");
    width: 100%;
    height: 100vh;
    background-size: 100% 100%;
    position: fixed;
    overflow: auto
}
</style>