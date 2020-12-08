'use strict';

import request from '@/utils/request'
const {apiUrl, isTestData } = require('@/setting');
import { getTestDataList } from "@/test-data/@pathname@";

/**
 * @description 描述
 * @param params { Object }
 * @returns {AxiosPromise}
 */
export function getTestList(params) {

  /**测试数据**/
  if (isTestData) {
    return getTestDataList(data)
  }

  let url = apiUrl.demoUrl;
  return request({
    url,
    method: 'get',
    params
  })
}

/**
 * @description 描述
 * @param data { Object }
 * @returns {AxiosPromise}
 */
export function postTestList(data) {
  /**测试数据**/
  if (isTestData) {
    return getTestDataList(data)
  }

  let url = apiUrl.demoUrl;
  data = request.formDataSendParam(data);
  return request({
    url,
    method: 'post',
    data
  })
}








