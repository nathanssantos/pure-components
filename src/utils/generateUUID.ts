const generateUUID = () => {
  let d = new Date().getTime();
  let d2 = performance.now() * 1000;

  return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, () => {
    let r = Math.random() * 16;

    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }

    return ((r & 0x7) | 0x8).toString(16);
  });
};

export default generateUUID;
