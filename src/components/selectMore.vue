<template>
    <n-card class="card_bordered">
        <n-space vertical :size=40>
            <n-space vertical>
                <n-h2 prefix="bar">
                    <n-text type="primary">
                        热门导航
                    </n-text>
                </n-h2>
                <n-space :size=30>
                    <n-button size="large" type="info" ghost @click="jump(category)" v-for="category in state.mainCategory" :key ="category.label"> 
                        <n-space>
                            <n-icon>
                                <StorefrontOutline v-if="category.label == '首页'"/>
                                <BicycleOutline v-else-if="category.label == '体育'"/>
                                <FastFoodOutline v-else-if="category.label == '娱乐'"/>
                                <EarthOutline v-else-if="category.label == '政治'"/>
                                <BulbOutline v-else-if="category.label=='科技'"/>
                            </n-icon>
                            {{category.label}}
                        </n-space>
                    </n-button>
                </n-space>
            </n-space>
            <n-space vertical>
                <n-h2 type="info" prefix="bar">
                    <n-text type="info">
                        更多导航
                    </n-text>
                </n-h2>
                <n-space :size=30>
                    <n-button size="large" type="success" ghost @click="jump(category)" v-for="category in state.moreCategory" :key ="category.label"> 
                        <n-space>
                            <n-icon>
                                <PeopleCircleOutline v-if="category.label=='社会'"/>
                                <StatsChartOutline v-else-if="category.label == '金融'"/>
                                <CarSportOutline v-else-if="category.label == '汽车'"/>
                                <GameControllerOutline v-else-if="category.label == '游戏'"/>
                                <DiamondOutline v-else-if="category.label == '时尚'"/>
                                <HeartOutline v-else-if="category.label == '健康'"/>
                                <SchoolOutline v-else-if="category.label == '教育'"/>
                                <LibraryOutline v-else-if="category.label == '历史'"/>
                            </n-icon>
                            {{category.label}}
                        </n-space>
                    </n-button>
                    
                </n-space>
            </n-space>
        </n-space>
    </n-card>
</template>

<script setup lang="ts">
import {NCard, NSpace, NH2 ,NText, NButton,NIcon,} from 'naive-ui'
import { defineProps,reactive,defineEmits } from 'vue';
import { StorefrontOutline,CarSportOutline,GameControllerOutline, BulbOutline, PeopleCircleOutline, StatsChartOutline, BicycleOutline, DiamondOutline, HeartOutline, LibraryOutline, FastFoodOutline, SchoolOutline, EarthOutline } from '@vicons/ionicons5';
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
    {key:'social', label:'社会'},
    {key:'finance', label:'金融'},
    {key:'auto', label:'汽车'},
    {key:'game', label:'游戏'},
    {key:'fashion', label:'时尚'},
    {key:'health', label:'健康'},
    {key:'edu', label:'教育'},
    {key:'history', label:'历史'},
)
function jump(category: Category){
    console.log("请求后端给我点新闻")
    console.log(category.key)
    API({
        headers:{"Authorization": window.localStorage.getItem("token")},
        url:'allnews',
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
    /* margin-left: 50%; */
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    background-color: rgba(255, 255, 255, 0.8);
}

</style>