import fs from "fs";
import path from "path";

const rootFolder = "./crawled-files";

const getCurrentRoundNumber = () => {
  if (!fs.existsSync(rootFolder)) {
    fs.mkdirSync(rootFolder, { recursive: true });
    return 1;
  }

  const existingRounds = fs
    .readdirSync(rootFolder)
    .map((name) => parseInt(name))
    .filter((number) => !isNaN(number))
    .sort((a, b) => a - b);

  return existingRounds.length === 0
    ? 1
    : existingRounds[existingRounds.length - 1] + 1;
};

const roundNumber = getCurrentRoundNumber();
const createdDirectories = new Set();

const createNewFile = (filePath: string, templateText: string) => {
  const roundFolder = path.join(rootFolder, roundNumber.toString());
  const dirPath = path.join(roundFolder, path.dirname(filePath));

  if (!createdDirectories.has(dirPath)) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    createdDirectories.add(dirPath);
  }

  const fileNameWithExt = path.basename(filePath);
  const lastDotIndex = fileNameWithExt.lastIndexOf(".");
  const fileName = fileNameWithExt.substring(0, lastDotIndex);
  const fileExtension = fileNameWithExt.substring(lastDotIndex + 1);

  let fullFilePath = path.join(dirPath, `${fileName}.${fileExtension}`);
  let counter = 1;

  while (fs.existsSync(fullFilePath)) {
    fullFilePath = path.join(
      dirPath,
      `${fileName}(${counter}).${fileExtension}`
    );
    counter++;
  }

  fs.writeFileSync(fullFilePath, templateText);
};

export default createNewFile;
