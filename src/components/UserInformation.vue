<template>
<n-grid :item-responsive="true" :x-gap="16" :y-gap="16">
    <n-grid-item span="0:24 640:24 1024:10">
      <n-space :vertical="true" :size="16">
        <n-card title="用户基本信息" :bordered="true" size="large" class="shadow-sm rounded-16px">
					<n-space :vertical="true" :size="16" style="text-align:center" >
						<UserAvatar style="margin-left:30%" :width="120" :height="120" :image_code="props.user.avatar" @changeavatar="update_avatar"></UserAvatar>
						<n-text style="font-size:30px">
              欢迎，{{props.user.user_name}}！
						</n-text>
            <n-text style="color:#808080">
              个性签名：{{props.user.signature}}
            </n-text>
					</n-space>
        </n-card>
        <n-card title="最近浏览" :bordered="true" size="large" class="shadow-sm rounded-16px">
          <WordChart :tags="props.user.tags"></WordChart>
        </n-card>
      </n-space>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:14">
      <n-space :vertical="true" :size="16">
        <EditInformation :user="props.user"/>
        <n-card title="小彩蛋" :bordered="true" size="large" class="shadow-sm rounded-16px">
          <n-space  :vertical="true" :size="16" style="text-align:center">
            <n-image :src="img" :width=150  />
            <n-text>
              请支援我们！清华的可怜孩子连饭都吃不饱了！  
            </n-text>
          </n-space>

        </n-card>
      </n-space>
      
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">

import { NGrid,NGridItem, NCard, NSpace,NText,NImage } from 'naive-ui';
import { defineProps,defineEmits } from 'vue'
import UserAvatar from '@/components/UserAvatar.vue'
import EditInformation from './EditInformation.vue';
import WordChart from './WordChart.vue';
export interface UserInfo {
  id: string,
  user_name: string,
  signature: string,
  tags: {},
  mail: string,
  avatar: string,
}
const props = defineProps<{
  user:UserInfo,
}>();
const emits = defineEmits(['change-info','change-avatar']);
const img = require("@/assets/QRcode.jpg")

function update_avatar(img_code:string) {
  emits('change-avatar', img_code)
  // 更新主页面
}
</script>