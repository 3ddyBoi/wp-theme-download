import fs from "fs";
import path from "path";

const rootFolder = "./crawled-files";

const getCurrentRoundNumber = () => {
  if (!fs.existsSync(rootFolder)) {
    fs.mkdirSync(rootFolder, { recursive: true });
    return 1; // Start with round 1 if the root folder doesn't exist
  }

  const existingRounds = fs
    .readdirSync(rootFolder)
    .map((name) => parseInt(name))
    .filter((number) => !isNaN(number))
    .sort((a, b) => a - b);

  if (existingRounds.length === 0) return 1;
  return existingRounds[existingRounds.length - 1] + 1; // Increment the highest round number
};

const roundNumber = getCurrentRoundNumber();

const createNewFile = (filePath: string, templateText: string) => {
  const roundFolder = path.join(rootFolder, roundNumber.toString());

  const dirPath = path.join(roundFolder, path.dirname(filePath));

  const fileNameWithExt = path.basename(filePath);
  const lastDotIndex = fileNameWithExt.lastIndexOf(".");
  const fileName = fileNameWithExt.substring(0, lastDotIndex);
  const fileExtension = fileNameWithExt.substring(lastDotIndex + 1);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

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
