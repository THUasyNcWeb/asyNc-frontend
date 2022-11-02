/*
 * @FileDescription: 新闻搜索页面 Mock
 * @Author: 王博文
 * @Date: 2022-10-24 00:36
 * @LastEditors: 王博文
 * @LastEditTime: 2022-10-25 10:31
 */
import Mock from 'better-mock';

Mock.setup({ timeout: '200-400' });

Mock.mock(/search/, 'post', rqst => {
  const body = JSON.parse(rqst.body);
  const word = body.query;
  console.log("测试一下请求")
  console.log(rqst.url)
  const page = body.page;
  const news = [];
  if (word == '敏感词') {
    return {
      code: 0,
      message: 'SUCCESS',
      data: {
        page_count: 0,
        news: [],
      }
    }
  }
  if (word == '危险言论') {
    return;
  }
  if (word) {
    news.push({
      title: `搜到了好东西：第 ${page} 页`,
      media: '见得风就是雨',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      pub_time: new Date().toJSON(),
      content: `你说的对，但是「${word}」是由用户自主输入的一款全新搜索词。搜索发生在一个被称作「Git」的版本控制系统，在这里被「甲方」选中的小组将被授予「需求」，引导 DDL 之力。你将扮演一位名为「乙方」的神秘角色，在自由的开发中邂逅性格各异、能力独特的组员们，和他们一起击败「大作业」——同时发掘「软件开发」的真相。`,
      title_keywords: [[0, 6]],
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
      picture_url: 'https://www.desmos.com/assets/img/homepage-student.png',
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


Mock.mock(/all_news/, 'get', resq => {
  
  let data = [];
  const url = resq.url
  console.log(url)
  let params = ''
  if (url.indexOf("?") != -1) {    //判断是否有参数
    const str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
    const strs = str.split("=");   //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
    params = strs[1];          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
  }
  if(params == 'home') {
    console.log("首页")
    data = [
      {
        title: "首页新闻应该有首页的样子",
        picture_url: 'https://www.desmos.com/assets/img/homepage-student.png',
        url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
        media: "mihomo",
        pub_time:"1926-08-17",
      },
      ]
  }
  else if (params == 'ent'){
    console.log('娱乐')
    data = [
      {
        title: '3.2的纳西妲我必定拿下',
        picture_url: 'https://www.desmos.com/assets/img/homepage-student.png',
        url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
        media:"mihoyo",
        pub_time:"2022-11-02"
      },
      {
          title: '你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。',
          picture_url: 'https://www.desmos.com/assets/img/homepage-student.png',
          url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
          media: "mihomo",
          pub_time:"1926-08-17",
      }
    ]
  }
  else if(params == 'sports') {
    data = [{
      title: '你说的对，但是《计算机系统概论》是由清华大学计算机系自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「C语言」的幻想世界，在这里，被助教选中的人将被授予「协程大作业」，导引代码之力。你将扮演一位名为「大二学生」的神秘角色，在和栈帧的博弈中邂逅性格各异、能力独特的寄存器们，和他们一起读写数据，恢复进程的状态——同时，逐步发掘「协程」的真相。',
      picture_url: '',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      media: "mihomo",
      pub_time:"1926-08-17",
    },
    {
      title: '非常好的带图新闻',
      picture_url: 'https://www.desmos.com/assets/img/homepage-student.png',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      media: "mihomo",
      pub_time:"1926-08-17",
    },
    ]
  }
  else if (params == 'politics') {
      data = [{
        title: '你说的对，但是《计算机系统概论》是由清华大学计算机系自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「C语言」的幻想世界，在这里，被助教选中的人将被授予「协程大作业」，导引代码之力。你将扮演一位名为「大二学生」的神秘角色，在和栈帧的博弈中邂逅性格各异、能力独特的寄存器们，和他们一起读写数据，恢复进程的状态——同时，逐步发掘「协程」的真相。',
        picture_url: '',
        url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
        media: "mihomo",
        pub_time:"1926-08-17",
      },
      {
        title: '非常好的带图新闻',
        picture_url: 'https://www.desmos.com/assets/img/homepage-student.png',
        url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
        media: "mihomo",
        pub_time:"1926-08-17",
      },
      ] 
  }
  else if (params == 'tech') {
    data = [{
      title: '你说的对，但是《计算机系统概论》是由清华大学计算机系自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「C语言」的幻想世界，在这里，被助教选中的人将被授予「协程大作业」，导引代码之力。你将扮演一位名为「大二学生」的神秘角色，在和栈帧的博弈中邂逅性格各异、能力独特的寄存器们，和他们一起读写数据，恢复进程的状态——同时，逐步发掘「协程」的真相。',
      picture_url: '',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      media: "mihomo",
      pub_time:"1926-08-17",
    },
    {
      title: '非常好的带图科技新闻',
      picture_url: 'https://www.desmos.com/assets/img/homepage-student.png',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      media: "mihomo",
      pub_time:"1926-08-17",
    },
    ] 
  }
  else if (params == 'fashion') {
    data = [{
      title: '你说的对，但是《计算机系统概论》是由清华大学计算机系自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「C语言」的幻想世界，在这里，被助教选中的人将被授予「协程大作业」，导引代码之力。你将扮演一位名为「大二学生」的神秘角色，在和栈帧的博弈中邂逅性格各异、能力独特的寄存器们，和他们一起读写数据，恢复进程的状态——同时，逐步发掘「协程」的真相。',
      picture_url: '',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      media: "mihomo",
      pub_time:"1926-08-17",
    },
    {
      title: '非常好的带图科技新闻',
      picture_url: 'https://www.desmos.com/assets/img/homepage-student.png',
      url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      media: "mihomo",
      pub_time:"1926-08-17",
    },
  ]}

  return {
    data
  }
});