/*
 * @FileDescription: 实现axios全局配置
 * @Author: 郑友捷
 * @Date: 2022-10-06 18:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-06 20:43
*/
import axios from 'axios'

//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const API = axios.create({
    baseURL:'http://127.0.0.1:8000',// baseUrl
	timeout: 2000                   // 请求超时设置，单位ms
})

export default API
