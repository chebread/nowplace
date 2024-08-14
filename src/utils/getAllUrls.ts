const getAllUrl = () => {
  const win = window as Window;
  const url = win.location.href;
  return url;
};

export default getAllUrl;
