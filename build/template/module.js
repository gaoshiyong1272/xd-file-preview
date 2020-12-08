'use strict';

import {
  getTestList,
  postTestList
} from '@/api/@pathname@';

const state = {};

const actions = {
  /**
   * @description postTestList
   * @param commit
   * @param params
   * @returns {Promise<unknown>}
   */
  getTestList({commit}, params) {
    return new Promise((resolve, reject) => {
      getTestList(params)
        .then((res) => {
          console.log('getTestList.res', res.data);
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        })
    })
  },

  /**
   * @description 描述
   * @param commit
   * @param params
   * @returns {Promise<unknown>}
   */
  postTestList({commit}, params) {
    return new Promise((resolve, reject) => {
      postTestList(params)
        .then((res) => {
          console.log('postTestList.res', res.data);
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        })
    })
  },
};

const getters = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
