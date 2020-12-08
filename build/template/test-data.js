'use strict';

/**
 * @description 测试数可以使用faker
 * @description https://github.com/Marak/faker.js
 */
import helper from "@/utils/helper";

/**
 * @description 描述
 * @param data
 * @returns {Promise<unknown>}
 */
export function getTestDataList(data) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(helper.callback([]));
		}, 1000)
	});
}
