import { mount } from '@vue/test-utils';
import SearchBox from '@/components/SearchBox.vue';
import { NButton } from 'naive-ui';

describe('SearchBox.vue', () => {
  test('test query text rendering', () => {
    const text = 'Some searching text';
    const wrapper = mount(SearchBox, {
      props: { text }
    });
    expect(wrapper.find('input').element.value).toMatch(text);
  });
});