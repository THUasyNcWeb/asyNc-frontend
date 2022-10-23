import * as Mock from 'better-mock';

Mock.setup({ timeout: '200-400' });

Mock.mock(/search/, 'post', rqst => {
  let body = JSON.parse(rqst.body);
  let word = body.query;
  let page = body.page;
  let news = [];
  if (word) {
    news.push({
      title: `搜到了好东西：第 ${page} 页`,
      media: '见得风就是雨',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      pub_time: new Date().toJSON(),
      content: `你说的对，但是「${word}」是由用户自主输入的一款全新搜索词。搜索发生在一个被称作「Git」的版本控制系统，在这里被「甲方」选中的小组将被授予「需求」，引导 DDL 之力。你将扮演一位名为「乙方」的神秘角色，在自由的开发中邂逅性格各异、能力独特的组员们，和他们一起击败「大作业」——同时发掘「软件开发」的真相。`,
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
      keywords: [],
    },
    {
      title: '非常好新闻',
      media: '亦可赛艇新闻',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      pub_time: new Date(1926, 7, 17).toJSON(),
      content: '苟利国家生死以',
      keywords: [],
    },
    {
      title: '有图片的非常好新闻',
      media: '亦可赛艇新闻',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      pub_time: new Date(1926, 7, 17).toJSON(),
      content: '苟利国家生死以',
      picture_url: 'https://app.moegirl.org.cn/萌百娘表情包/萌百娘表情包2/钻地.png',
      keywords: [],
    },
    {
      title: '有图片的很长的非常好新闻',
      media: '有仙则名新闻',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      pub_time: new Date(9876, 4, 43).toJSON(),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      picture_url: 'https://www.desmos.com/assets/img/homepage-student.png',
      keywords: [],
    },
    {
        title: 'Breaking News',
        media: 'Foobar News',
        url: 'https://breaking.news',
        pub_time: '2022-10-21T19:02:16.305Z',
        content: 'BREAKING NEWS!!!',
        picture_url: 'https://breaking.news/picture.png',
        keywords: [
            [1, 3],
            [7, 9],
            [10, 15]
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