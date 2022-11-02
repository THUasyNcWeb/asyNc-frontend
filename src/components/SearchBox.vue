<!--
 * @FileDescription: 搜索框
 * @Author: 王博文
 * @Date: 2022-10-19 23:28
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-02 17:52
-->

<template>
  <n-auto-complete v-model:value="text" placeholder="搜索" size="large" clearable :options="suggestions"
    @keyup.enter="search" @select="select" @update:value="update" @compositionend.prevent>
    <template #prefix>
      <n-space>
        <n-tag v-for="tag in tags" type="info" closable>
          {{ tag }}
        </n-tag>
        <n-input v-if="show" v-model:value="inputValue" size="small" :options="options"
          placeholder="邮箱" :clear-after-select="true" @load.stop @update.stop @compositionstart.stop @compositionend.stop.prevent="no" @compositionupdate.stop
          @keydown.space.stop @keyup.space.stop @update:value.stop @change.stop @keyup.stop @blur="nohello" @input.stop @keyup.enter.stop="submit" />
      </n-space>
    </template>
    <template #suffix>
      <!-- <n-button size="small" type="primary" dashed @click="hello">
        <template #icon>
          <n-icon>
            <Add />
          </n-icon>
        </template>
        添加
      </n-button> -->

      <n-dropdown :options="options" @select="dropdownSelect">
        <n-button @click="search" large circle quaternary type="primary">
          <n-icon size="large" :component="Search" />
        </n-button>
      </n-dropdown>
    </template>
  </n-auto-complete>
</template>

<script setup lang="ts">
import { computed, defineProps, h, nextTick, reactive, ref, watch } from 'vue';
import { NAutoComplete, NButton, NDropdown, NDynamicTags, NIcon, NInput, NSpace, NTag } from 'naive-ui';
import { Search } from '@vicons/ionicons5/';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import Add from '@vicons/ionicons5/Add'
import AddCircle from '@vicons/ionicons5/AddCircleOutline';
import RemoveCircle from '@vicons/ionicons5/RemoveCircleOutline';
import API from '@/store/axiosInstance';

import { AutoCompleteInst, AutoCompleteOptions } from 'naive-ui/es/auto-complete/src/interface';

const tags = ref([]);

const show = ref(false);

function no() {
  alert('Nop!!');
}

function hello() {
  show.value = true;
}

function nohello() {
  show.value = false;
}

function dropdownSelect(key: string) {
  // alert(key);
  hello();
}

function submit() {
  tags.value.push(inputValue.value);
  show.value = false;
  this.inputValue = false;
  // alert(e);
}

function renderIcon(icon) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
}

const autoCompleteInstRef = ref<AutoCompleteInst | null>(null)
watch(autoCompleteInstRef, (value) => {
  if (value) nextTick(() => value.focus())
})
const inputValue = ref('');
const options = [
  {
    label: '添加必含词',
    key: 'include',
    icon: renderIcon(AddCircle),
  },
  {
    label: '添加排除词',
    key: 'exclude',
    icon: renderIcon(RemoveCircle),
  },
]

const router = useRouter();

const props = defineProps({
  text: String,
});

const text = ref(props.text ?? '');

// Update keywords when route updates, e.g. routing back and forth
onBeforeRouteUpdate((to) => {
  text.value = to.query.q as string;
});

// Search suggestions
const suggestions: AutoCompleteOptions = reactive([]);
let timestamp = 0;

// Fetch search suggestions
function update() {
  // Use timestamp to avoid jam
  const current_timestamp = ++timestamp;

  API({
    headers: {
      Authorization: window.localStorage.getItem('token'),
    },
    url: 'search/suggest',
    method: 'post',
    data: {
      query: text.value,
    },
  }).then(response => {
    // Expired
    if (current_timestamp < timestamp) {
      return;
    }

    const suggestions_s = response.data.data.suggestions as string[];

    // Clear current suggestions
    suggestions.length = 0;

    suggestions_s.forEach(value => {
      suggestions.push({
        label: value,
        value,
      });
    });
  });
}

// Handle select event, update query keyword and perform search
function select(keyword: string) {
  text.value = keyword;
  search();
}

function search() {
  // Change current route slightly
  // to force update the router view
  router.currentRoute.value.hash = '0';
  router.push(`/search?q=${text.value}`);
}
</script>