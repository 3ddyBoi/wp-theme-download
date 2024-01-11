const getFilePath = (href: string) => {
  if (!href) {
    throw new Error("Could not find current file path");
  }

  const fileParam = new URLSearchParams(href.split("?")[1]);
  const filePath = fileParam.get("file");

  if (!filePath) {
    throw new Error("Could not find current file path");
  }

  return filePath;
};

export default getFilePath;
