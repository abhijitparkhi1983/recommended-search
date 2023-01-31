const debounce = <T>(func: (arg: T) => void, timeout = 300) => {
  let timer: ReturnType<typeof setTimeout>;
  return (arg: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(arg);
    }, timeout);
  };
};

export default debounce;


// export const debounce = <F extends (...args: any[]) => any>(
//   callback: F,
//   delay: number,
// ) => {
//   let timerID: ReturnType<typeof setTimeout>;

//   return (...args: Parameters<F>) => {
//     if (timerID) clearTimeout(timerID);
//     timerID = setTimeout(callback, delay, ...args);
//   };
// };