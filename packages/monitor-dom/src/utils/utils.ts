// 工具函数

/**
 * 
 * @param source 源对象
 * @param name 修改的属性名
 * @param replacement 修改的函数
 * @returns 
 */
 export function replaceOld(
  source: {
    [key: string] : any
  },
  name: string,
  replacement: (...args: any[]) => any
): void {
  // 如果源对象中不存在该属性则返回
  if(! (name in source)) return;
  const original = source[name]; // 将原来的值传入
  const wrapped = replacement(original); // 作为
  if(typeof wrapped === 'function'){
    source[name] = wrapped;
  }
};