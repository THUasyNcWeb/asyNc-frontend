/*
 * @FileDescription: 新闻搜索页面 Mock
 * @Author: 王博文
 * @Date: 2022-10-24 00:36
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-02 18:52
 */
import Mock from 'better-mock';

import config from '../../config/config.json'

Mock.setup({ timeout: '200-400' });

const URL = `${config.url}:${config.port}`;

Mock.mock(`${URL}/search`, 'post', rqst => {
  const body = JSON.parse(rqst.body);
  const { query, page, include, exclude } = body;
  const news = [];
  if (query == '敏感词') {
    return {
      code: 0,
      message: 'SUCCESS',
      data: {
        page_count: 0,
        news: [],
      }
    }
  }
  if (query == '危险言论') {
    return;
  }
  if (query) {
    news.push({
      title: `搜到了好东西：第 ${page} 页`,
      media: '见得风就是雨',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      pub_time: new Date().toJSON(),
      content: `你说的对，但是「${query}」是由用户自主输入的一款全新搜索词。搜索发生在一个被称作「Git」的版本控制系统，在这里被「甲方」选中的小组将被授予「需求」，引导 DDL 之力。你将扮演一位名为「乙方」的神秘角色，在自由的开发中邂逅性格各异、能力独特的组员们，和他们一起击败「大作业」——同时发掘「软件开发」的真相。`,
      title_keywords: [[0, 6]],
      keywords: [],
    })
  }
  if (include.length) {
    news.push({
      title: `➕ Inclusion Keywords Detected`,
      media: 'Mock',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      pub_time: new Date().toJSON(),
      content: include.join(),
      title_keywords: [[1, 11]],
      keywords: [],
    })
  }
  if (exclude.length) {
    news.push({
      title: `➖ Exclusion Keywords Detected`,
      media: 'Mock',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      pub_time: new Date().toJSON(),
      content: exclude.join(),
      title_keywords: [[1, 11]],
      keywords: [],
    })
  }
  news.push(
    {
      title: '测试新闻',
      media: '腾讯新闻',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      pub_time: new Date().toJSON(),
      content: '你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！',
      title_keywords: [[0, 1], [2, 3]],
      keywords: [],
    },
    {
      title: '非常好新闻',
      media: '亦可赛艇新闻',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      pub_time: new Date(1926, 7, 17).toJSON(),
      content: '苟利国家生死以',
      title_keywords: [[0, 3]],
      keywords: [],
    },
    {
      title: '有图片的非常好新闻',
      media: '亦可赛艇新闻',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      pub_time: new Date(1926, 7, 17).toJSON(),
      content: '苟利国家生死以',
      picture_url: 'https://app.moegirl.org.cn/萌百娘表情包/萌百娘表情包2/钻地.png',
      title_keywords: [[4, 7]],
      keywords: [],
    },
    {
      title: '有图片的很长的非常好新闻',
      media: '有仙则名新闻',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      pub_time: new Date(9876, 4, 43).toJSON(),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      picture_url: 'https://www.desmos.com/assets/img/homepage-student.png',
      title_keywords: [[7, 10]],
      keywords: [],
    },
    {
        title: 'Breaking News',
        media: 'Foobar News',
        url: 'https://breaking.news',
        pub_time: '2022-10-21T19:02:16.305Z',
        content: 'BREAKING NEWS!!!',
        picture_url: 'https://breaking.news/picture.png',
        title_keywords: [[0, 8]],
        keywords: [
            [1, 3],
            [7, 9],
            [10, 15]
        ]
    },
    {
      title: '萨满祭司 (卡牌游戏《炉石传说》中的职业)',
      media: '百度百科',
      url: 'https://baike.baidu.com/item/萨满祭司/49863467?fr=aladdin',
      pub_time: '2022-10-24T19:02:16.305Z',
      content: '萨满祭司是暴雪娱乐公司出品的卡牌游戏《炉石传说》中的一个职业。萨满祭司是原始元素的大师，能操纵自然的力量降下治疗之雨、倾泻熔岩洪流，或是召唤灵魂盟友助战。萨满祭司的能力反映出了自然之力的平衡：全面而强大的随从、法术、增益和伤害。',
      picture_url: 'http://n.sinaimg.cn/sinacn07/576/w825h551/20180703/27fe-hevauxi3280692.png',
      title_keywords: [[0, 4], [11, 15]],
      keywords: [
          [0, 4],
          [31, 35],
          [77, 81]
      ]
  }
  );
  return {
    code: 0,
    message: 'SUCCESS',
    data: {
      page_count: 15,
      news
    }
  }
});

Mock.mock(`${URL}/search/suggest`, 'post', rqst => {
  const body = JSON.parse(rqst.body);
  const query = body.query;
  const suggestions = [
    `${query}建议1`,
    `${query}建议2`,
    `${query}建议3`,
  ];
  if (new Date().getMilliseconds() % 2 == 0) {
    suggestions.push(`${query}建议4`);
  }
  if (new Date().getMilliseconds() % 5 == 0) {
    suggestions.push(`${query}建议5`);
  }
  return {
    code: 0,
    message: 'SUCCESS',
    data: {
      suggestions
    }
  };
});

Mock.mock(/all_news/, 'get', _ => {
  const data = [];
  data.push(
    {
      title: '测试新闻',
      picture_url: 'http://43.143.201.186:8080/images/test.jpg',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      category: '原神',
    },
    {
      title: '测试新闻',
      picture_url: 'http://43.143.201.186:8080/images/test.jpg',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      category: '原神',
    },
    {
      title: '测试新闻',
      picture_url: 'http://43.143.201.186:8080/images/test.jpg',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      category: '清华',
    },
    {
      title: '测试新闻',
      picture_url: 'http://43.143.201.186:8080/images/test.jpg',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      category: '清华',
    },
  );
  return {
    data
  }
});