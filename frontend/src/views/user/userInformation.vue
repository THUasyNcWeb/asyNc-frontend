<!--
 * @FileDescription: 用户信息界面
 * @Author: 郑友捷
 * @Date: 2022-10-08 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-08 17:00
 -->
<template>
    <div>
        用户名:{{now_username}}
    </div>
    <div>
        个性签名:我永远喜欢宵宫
    </div>
    <div>
        最近常搜索的tag：原神、王者
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import {NInput,NH1} from 'naive-ui'
export default {
    components: {
        NInput,
        NH1,
    },
    setup() {
        const router = useRoute()
        const now_username = router.params.user_name
        // 获取props
        return {
            now_username
        }
    }
}
</script>

<style>

</style>