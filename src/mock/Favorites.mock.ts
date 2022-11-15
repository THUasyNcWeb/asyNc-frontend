/*
 * @FileDescription: 收藏功能 Mock
 * @Author: 王博文
 * @Date: 2022-11-07 02:44
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-15 11:17
 */

import Mock from 'better-mock';

import config from '../../config/config.json'

Mock.setup({ timeout: '200-400' });

const URL = `${config.url}:${config.port}`;

let favList = [
  {
    id: 1,
    title: '测试新闻',
    media: '腾讯新闻',
    url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
    pub_time: new Date().toJSON(),
    visit_time: new Date().toJSON(),
  },
  {
    id: 2,
    title: '非常好新闻',
    media: '亦可赛艇新闻',
    url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
    pub_time: new Date(1926, 7, 17).toJSON(),
  },
  {
    id: 3,
    title: '有图片的非常好新闻有图片的非常好新闻有图片的非常好新闻',
    media: '亦可赛艇新闻',
    url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
    pub_time: new Date(1926, 7, 17).toJSON(),
    image_url: 'https://app.moegirl.org.cn/萌百娘表情包/萌百娘表情包2/钻地.png',
    visit_time: new Date().toJSON(),
  },
  {
    id: 4,
    title: '有图片的很长的非常好新闻一个一个一个啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
    media: '有仙则名新闻',
    url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
    image_url: 'https://www.desmos.com/assets/img/homepage-student.png',
    pub_time: new Date(9876, 4, 43).toJSON(),
  },
  {
    id: 5,
    title: 'Breaking News',
    media: 'Foobar News Pro Plus Max Ultra',
    url: 'https://breaking.news',
    image_url: 'https://breaking.news/picture.png',
    pub_time: '2022-10-21T19:02:16.305Z',
    visit_time: new Date().toJSON(),
  },
  {
    id: 6,
    title: '萨满祭司 (卡牌游戏《炉石传说》中的职业)',
    media: '百度百科',
    url: 'https://baike.baidu.com/item/萨满祭司/49863467?fr=aladdin',
    image_url: 'https://bkimg.cdn.bcebos.com/pic/3801213fb80e7beccf8ad6f12b2eb9389b506b4a?x-bce-process=image/resize,m_lfit,w_128,limit_1',
    pub_time: '2022-10-24T19:02:16.305Z',
  }
];

favList = favList.concat(favList);

Mock.mock(/history|readlater|favorites/, 'get', _ => {
  return {
    code: 0,
    message: 'SUCCESS',
    data: {
      page_count: 5,
      news: favList.slice(-10).reverse(),
    }
  }
})

Mock.mock(/history|readlater|favorites/, 'post', rqst => {
  const id = rqst.url.match(/id=(.*)/)[1];
  favList.push({
    id,
    media: 'Test Media',
    title: `News ${id}`,
    url: `https://baidu.com`,
    pub_time: new Date().toJSON(),
  });
  return {
    code: 0,
    message: 'SUCCESS',
    data: {}
  }
})

Mock.mock(/history|readlater|favorites/, 'delete', rqst => {
  const id = rqst.url.match(/id=(.*)/)[1];
  favList = favList.filter(t => t.id != id);
  return {
    code: 0,
    message: 'SUCCESS',
    data: {
      page_count: 5,
      news: favList.slice(-5).reverse(),
    }
  }
})