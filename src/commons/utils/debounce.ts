const debounce = <T>(func: (arg: T) => void, timeout = 300) => {
  let timer: NodeJS.Timeout | undefined;
  return (arg: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(arg);
    }, timeout);
  };
};

export default debounce;
