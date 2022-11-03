import { mount } from '@vue/test-utils';
import SearchBox from '@/components/SearchBox.vue';

describe('SearchBox.vue', () => {
  test('test query text rendering', () => {
    const text = 'Some searching text';
    const wrapper = mount(SearchBox, {
      props: { text }
    });
    expect((wrapper.find('.n-auto-complete > .n-input > .n-input-wrapper > \
      .n-input__input input').element as HTMLInputElement).value)
      .toMatch(text);
  });
});