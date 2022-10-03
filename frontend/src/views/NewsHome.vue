<!--
 * @FileDescription: 新闻搜索与展示主页
 * @Author: 郑友捷
 * @Date: 2022-10-03 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-03 14:11
 -->

<script>
import { defineComponent } from 'vue'
import { 
    NInput, 
    NLayoutHeader, 
    NCard, 
    NButton, 
    NDivider,
    NTooltip,
    } from 'naive-ui'
export default defineComponent({
    components: {
        NInput,
        NLayoutHeader,
        NCard,
        NButton,
        NDivider,
        NTooltip,
    },
    // 引入naive ui组件
    setup() {
        return {
            username: "zyj578335934" // 当前页面用户名
        }
    }
})
</script>
  
<template>
    <body>
        <n-layout-header style="height:30px; background: white;text-align: right;">
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
            <n-divider vertical="True" />
            <div class="guide_button">
                <a href="http://www.baidu.com">
                    百度首页
                </a>
            </div>
            <div class="guide_button">
                {{username}}
                <!-- 这里应该跳转到账号管理界面 -->
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
                        style="height:40px;weight:30px;margin-right: 10px;vertical-align: -50%;" />
                    <n-input-group>
                        <n-input style="width:500px;border-radius: 0%;" placeholder="百度一下，我也不知道">
                        </n-input>
                        <n-button style=" border-radius: 0%;  background: blue; height: 34px;margin-right: 10px;"
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