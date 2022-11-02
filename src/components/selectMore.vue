<template>
    <n-card class="card_bordered">
        <n-space vertical :size=40>
            <n-space vertical>
                <n-h2 prefix="bar">
                    <n-text type="primary">
                        热门导航
                    </n-text>
                </n-h2>
                <n-space>
                    <n-button @click="jump(category)" v-for="category in state.mainCategory" :key ="category.label"> 
                        {{category.label}}
                    </n-button>
                </n-space>
            </n-space>
            <n-space vertical>
                <n-h2 prefix="bar">
                    <n-text type="info">
                        更多导航
                    </n-text>
                </n-h2>
                <n-space>
                    <n-button @click="jump(category)" v-for="category in state.moreCategory" :key ="category.label"> 
                        {{category.label}}
                    </n-button>
                </n-space>
            </n-space>
        </n-space>
    </n-card>
</template>

<script setup lang="ts">
import {NCard, NSpace, NH2 ,NText, NButton} from 'naive-ui'
import { defineProps,reactive,defineEmits } from 'vue';
import API from "../store/axiosInstance"
export interface Category {
    key: string,
    label: string,
}
const emits = defineEmits(['updateCategory']);
const props = defineProps<{
  mainCategory:Category[],
}>();
const state = reactive({mainCategory:new Array(), moreCategory:new Array()})
for (var x of props.mainCategory) {
    state.mainCategory.push(x)
}

state.moreCategory.push(
    {key:'tech', label:'科技'},
    {key:'fashion', label:'时尚'},
    {key:'sport', label:'体育'},
)
function jump(category: Category){
    console.log("请求后端给我点新闻")
    console.log(category.key)
    API({
        headers:{"Authorization": window.localStorage.getItem("token")},
        url:'all_news',
        params:{
            category: category.key
        },
        method:'get',
        // 根据不同类别，把类别放在了对应的请求参数中
    }).then((res)=>{
        emits('updateCategory', res.data.data, category.key, category.label)
    }).catch((error) => {
        console.log(error);
    });
}

</script>

<style scoped>
.card_bordered {
    display: flex; 
    border-radius:15px;
    margin: auto; 
    margin-left: 50%;
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow:    0px -0.5px 5px #808080,   /*上边阴影 */
    -0.5px 0px 5px #808080,   /*左边阴影 */
    0.5px 0px 5px #808080,    /*右边阴影 */
    0px 0.5px 5px #808080;    /*下边阴影  */
}

</style>