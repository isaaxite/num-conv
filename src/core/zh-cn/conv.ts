export default class CnNumberConverter {
  private cnNumArr: string[] = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  private exUnitArr: string[] = ['', '亿', '亿亿', '亿亿亿', '亿亿亿亿'];
  private bigUnitArr: string[] = ['', '万'];
  private smallUnitArr: string[] = ['', '十', '百', '千']

  /**
   * 按位数分割数字文本
   * @param {string} numStr 
   * @param {number} step 
   */
  private splitNumStr(numStr: string, step: number = 4) {
    const temp = numStr.length % step;
    const firstEndIdx: number = temp ? temp : 0;
    const arr: string[] = firstEndIdx ? [numStr.slice(0, firstEndIdx)] : [];
    for (let i = firstEndIdx, len = numStr.length; i <= len; i += step) {
      const endIdx: number = i + step;
      const str: string = numStr.slice(i, endIdx);
      if (str) { arr.push(str); }
    }
    return arr;
  }

  /**
   * 将数字文本的每个字符单个转换成中文字符
   * @param {string} numStr
   */
  private toCnNum(numStr: string) {
    const {cnNumArr} = this;
    const strArr: string[] = [];
    for (let i = 0, len = numStr.length; i < len; i += 1) {
      strArr.push(cnNumArr[numStr[i]]);
    }
    return strArr;
  }

  /**
   * 给中文数字文本添加进率单位
   * @param _cnNumArr
   * @param bigUnit
   */
  private addUnit(_cnNumArr: string[], bigUnit: string) {
    const {smallUnitArr} = this;
    const CN_ZERO = this.cnNumArr[0];
    if (_cnNumArr.join('') === `${CN_ZERO}${CN_ZERO}${CN_ZERO}${CN_ZERO}`) {
      return [];
    }
    const cnNumArr = this.clearExtraZero(_cnNumArr);
    // console.log(Date.now(), 'cnNumArr:', cnNumArr);
    for (let i = 0, len = cnNumArr.length; i < len; i += 1) {
      const smallUnit: string = smallUnitArr[len - i - 1];
      const isUnvalid = cnNumArr[i] === CN_ZERO || !cnNumArr[i];
      cnNumArr[i] = `${cnNumArr[i]}${isUnvalid ? '' : smallUnit}`;
    }

    cnNumArr.push(bigUnit);
    return cnNumArr;
  }

  /**
   * 清除中文数字中多余的”零“
   * @param {string[]} cnNumArr
   */
  private clearExtraZero(cnNumArr: string[]) {
    const CN_ZERO = this.cnNumArr[0];
    cnNumArr.forEach((cnNum, idx) => {
      if (
        cnNum === CN_ZERO
        && (cnNumArr[idx + 1] === CN_ZERO || !cnNumArr[idx + 1])
      ) {
        cnNumArr[idx] = '';
      }
    });
    return cnNumArr;
  }

  /**
   * 将8位以内的阿拉伯数字转换成中文数字
   * @param {string} numStr
   */
  private transformNor(numStr: string) {
    const {bigUnitArr} = this;
    const splitNumStrArr = this.splitNumStr(numStr);
    // console.log(Date.now(), 'splitNumStrArr:', splitNumStrArr);
    const cnNumMatrix: Array<string[]> = splitNumStrArr.map((str) => this.toCnNum(str));
    // console.log(Date.now(), 'cnNumMatrix:', cnNumMatrix);
    const unitedCnNumArr: string[] = cnNumMatrix.map((cnNumArr, idx) => {
      const bigUnit = bigUnitArr[cnNumMatrix.length - idx - 1];
      return this.addUnit(cnNumArr, bigUnit).join('');
    });
    // console.log(Date.now(), 'unitedCnNumArr:', unitedCnNumArr);
    return unitedCnNumArr.join('');
  }

  /**
   * 将阿拉伯数字转换成中文数字
   * @param {number | string} num
   */
  public transform(num: number | string) {
    const {exUnitArr} = this;
    const numStr: string = num + '';
    const STEP = 8;
    if (numStr.length > exUnitArr.length * STEP) {
      throw new Error('The current value has exceeded the range that can be converted');
    }
    const exSplitNumStrArr = this.splitNumStr(num + '', 8);
    const exCnumStrArr: string[] = exSplitNumStrArr.map((numStr, idx) => {
      const exUnit = exUnitArr[exSplitNumStrArr.length - idx - 1];
      const norCnumStr: string = this.transformNor(numStr);
      return `${norCnumStr}${exUnit}`;
    });
    return exCnumStrArr.join('');
  }
}
