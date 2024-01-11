const getFilePath = (href: string) => {
  if (!href) {
    throw new Error("Could not find current file path");
  }

  try {
    const url = new URL(href);
    const filePath = url.searchParams.get("file");

    if (!filePath) {
      throw new Error("Could not find current file path");
    }

    return filePath;
  } catch (e) {
    throw new Error("Error parsing the URL: " + e.message);
  }
};

export default getFilePath;
