import ZhCn from './core/zh-cn';
import * as lodash from 'lodash';
import {LANG} from './constant/lang';
import { NumberConv } from './interface/conv';

export const transform = (num: number, _options?: { lang: string }) => {
  const options: any = _options && lodash.isObject(_options) ? _options : {};
  let conv: NumberConv;
  switch (options.lang) {
    case LANG.ZH_CN:
      conv = new ZhCn();
    default:
      conv = new ZhCn()
  }
  return conv.transform(num);
};
