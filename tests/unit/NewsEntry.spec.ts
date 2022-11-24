import { mount } from '@vue/test-utils';
import NewsEntry from '@/components/NewsEntry.vue';
import { NMessageProvider } from 'naive-ui';
import { h } from 'vue';

describe('NewsEntry.vue', () => {
  test('test news entry rendering', () => {
    const news = {
      title: 'Title',
      url: 'url',
      media: 'media',
      pub_time: new Date(),
      content: 'Hello, world!',
      title_keywords: [],
      keywords: [[1, 5]],
    };
    const wrapper = mount(NMessageProvider, {
      slots: {
        default: h(NewsEntry, { news }),
      }
    });
    expect(wrapper.find('h2').text()).toMatch(news.title);
    expect(wrapper.find('a').element.href).toMatch(news.url);
    expect(wrapper.find('.n-text').text()).toMatch(news.media);
    expect(wrapper.find('#content').text()).toMatch(news.content);

    // Test date correctness
    const date = wrapper.findAll('.n-text')[1].text();
    expect(news.pub_time.toLocaleString([], {
      dateStyle: 'short',
      timeStyle: 'short',
    })).toMatch(date);
  });

  test('test picture rendering', () => {
    const news = {
      title: 'Title',
      url: 'url',
      media: 'media',
      pub_time: new Date(),
      picture_url: 'https://picture.img/pic1.png',
      content: 'Hello, world!',
      title_keywords: [],
      keywords: [[1, 5]],
    };
    const wrapper = mount(NMessageProvider, {
      slots: {
        default: h(NewsEntry, { news }),
      }
    });
    expect(wrapper.find('img').element.src).toMatch(news.picture_url);
  })

  test('test keywords rendering', () => {
    const news = {
      title: 'Title',
      url: 'url',
      media: 'media',
      pub_time: new Date(),
      content: 'Hello, world! This is a long long text.',
      title_keywords: [[0, 1], [3, 4], [4, 5]],
      keywords: [[1, 3], [7, 10]],
    };
    const wrapper = mount(NMessageProvider, {
      slots: {
        default: h(NewsEntry, { news }),
      }
    });
    const content = wrapper.find('#content').element;
    expect(content.childElementCount).toBe(5);

    const words = [];
    for (const span of content.getElementsByTagName('span')) {
      words.push(span.textContent);
    }

    expect(words).toEqual(['H', 'el', 'lo, ', 'wor', 'ld! This is a long long text.']);

    const title = wrapper.find('h2').element;
    expect(title.childElementCount).toBe(7);

    const title_words = [];
    for (const span of title.getElementsByTagName('span')) {
      title_words.push(span.textContent);
    }

    expect(title_words).toEqual(['', 'T', 'it', 'l', '', 'e', '']);
  })
});