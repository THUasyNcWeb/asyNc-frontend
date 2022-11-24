<!--
 * @FileDescription: 搜索框
 * @Author: 王博文
 * @Date: 2022-10-19 23:28
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-24 01:51
-->

<template>
  <n-auto-complete
    ref="autoCompleteRef"
    clearable
    size="large"
    placeholder="搜索"
    v-model:value="text"
    :options="suggestions"
    @keyup.enter="search"
    @select="suggestionSelect"
    @update:value="suggestionUpdate">
    <template #prefix>
      <n-space>
        <n-tag v-for="tag, index in tags" :key="index"
          closable :type="tagType(tag.type)" @close="tagClose(index)">
          {{ tag.value }}
        </n-tag>
        <!-- Use v-show here to avoid layout change -->
        <!-- Use composition*.stop here to stop Chinese input
          from being captured by parent input box -->
        <n-input
          ref="tagInputRef"
          size="small"
          style="width: 64px"
          v-show="tagInputVisible"
          v-model:value="tagInputValue"
          :placeholder="tagInputPlaceholder"
          :options="tagMenuOptions"
          @compositionstart.stop
          @compositionend.stop
          @blur="tagInputBlur"
          @keyup.enter.stop="tagInputSubmit" />
      </n-space>
    </template>
    <template #suffix>
      <n-dropdown class="search-box-dropdown" :options="tagMenuOptions" @select="tagMenuSelect">
        <n-button large circle quaternary type="primary" @click="search">
          <n-icon size="large" :component="Search" />
        </n-button>
      </n-dropdown>
    </template>
  </n-auto-complete>
</template>

<script setup lang="ts">
import { computed, defineProps, h, inject, nextTick, reactive, ref } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';

import { InputInst, NAutoComplete, NButton, NCheckbox, NDropdown, NIcon, NInput, NSpace, NTag } from 'naive-ui';
import { AutoCompleteInst, AutoCompleteOptions } from 'naive-ui/es/auto-complete/src/interface';

import { Search, AddCircleOutline, RemoveCircleOutline } from '@vicons/ionicons5/';

import { Tag, TagType } from '@/views/MainSurface.vue';

import API from '@/store/axiosInstance';

// Props & data
const props = defineProps({
  text: String,
  sort: String,
});

const text = ref(props.text ?? '');
const sort = ref(props.sort ?? '');

// Auto complete input
const autoCompleteRef = ref<AutoCompleteInst | null>(null);

// Tag input
const tagInputRef = ref<InputInst | null>(null);
const tagInputVisible = ref(false);
const tagInputType = ref<TagType | null>(null);
const tagInputValue = ref('');

const tagInputPlaceholder = computed(() => {
  switch (tagInputType.value) {
    case 'include':
      return '包含';
    case 'exclude':
      return '排除';
  }
  return '';
});

// Clear input value when tag input blurs
function tagInputBlur() {
  // Submit if user has already input something
  // Note that we don't focus to auto complete here
  if (tagInputValue.value) {
    tags.push({
      type: tagInputType.value,
      value: tagInputValue.value,
    });
  }
  tagInputVisible.value = false;
  tagInputValue.value = '';
}

// Append a new tag
function tagInputSubmit() {
  // Reject empty tag
  if (tagInputValue.value) {
    tags.push({
      type: tagInputType.value,
      value: tagInputValue.value,
    });
  }

  tagInputVisible.value = false;
  tagInputValue.value = '';

  // Focus to auto complete
  autoCompleteRef.value.focus();
}

// Tags
const tags: Tag[] = inject('inclusionExclusionTags');

const tagType = computed(() => (tagKey: TagType) => {
  switch (tagKey) {
    case 'include':
      return 'info';
    case 'exclude':
      return 'error';
  }
});

// Close a tag
function tagClose(index: number) {
  tags.splice(index, 1);
}

// Tag menu
const tagMenuOptions = [
  {
    label: '添加必含词',
    key: 'include',
    icon: renderIcon(AddCircleOutline),
  },
  {
    label: '添加排除词',
    key: 'exclude',
    icon: renderIcon(RemoveCircleOutline),
  },
  {
    type: 'render',
    key: 'sort',
    render: () => {
      return h(NCheckbox, {
        label: '时间优先',
        style: 'padding: 6px 10px;',
        checked: sort.value,
        checkedValue: 'time',
        uncheckedValue: null,
        'onUpdate:checked': value => sort.value = value,
      });
    },
  }
]

// Render function for icons
function renderIcon(icon) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
}

// Activate the tag input
function tagMenuSelect(key: TagType) {
  tagInputVisible.value = true;
  tagInputType.value = key;
  // Delay focus to next tick to ensure its execution
  nextTick(() => tagInputRef.value.focus());
}

// Search suggestions
const suggestions: AutoCompleteOptions = reactive([]);
let suggestionTimestamp = 0;

// Fetch search suggestions
function suggestionUpdate() {
  // Use timestamp to avoid jam
  const currentTimestamp = ++suggestionTimestamp;

  // Clear current suggestions
  suggestions.length = 0;

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
    if (currentTimestamp < suggestionTimestamp) {
      return;
    }

    const suggestion_list = response.data.data.suggestions as string[];

    // No suggestions
    if (suggestion_list.length === 0) {
      return;
    }

    // Insert default suggestion (the query keyword)
    suggestions.push({
      label: text.value,
      value: text.value,
    });

    suggestion_list.forEach(value => {
      // Avoid redundancy
      if (value === text.value) {
        return;
      }
      suggestions.push({
        label: value,
        value,
      });
    });
  });
}

// Handle select event, update query keyword and perform search
function suggestionSelect(keyword: string) {
  text.value = keyword;
  search();
}

// Routing
const router = useRouter();

// Update keywords when route updates, e.g. routing back and forth
onBeforeRouteUpdate(to => {
  // Update only when the query keyword is specified in the query parameters
  if (to.query.q) {
    text.value = to.query.q as string;
    sort.value = to.query.sort as string;
  }
});

// Perform search
function search() {
  // Change current route slightly
  // to force update the router view
  router.currentRoute.value.hash = '0';

  router.push({
    path:'/search',
    query: {
      q: text.value,
      sort: sort.value || undefined,
    },
  });

  // Update suggestion timestamp
  // to stop receiving suggestion
  suggestionTimestamp++;
}
</script>

<style>
.search-box-dropdown .n-checkbox-box-wrapper {
  margin-right: 2px;
}
</style>