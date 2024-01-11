const checkEnvs = (envNames: string[]): { [key: string]: string } => {
  const missingEnvs = envNames.filter((envName) => !process.env[envName]);

  if (missingEnvs.length > 0) {
    const envList = missingEnvs.join(", ");
    const isPlural = missingEnvs.length > 1;
    const errorMessage = `Missing required environment variable${
      isPlural ? "s" : ""
    }: ${envList}`;
    throw new Error(errorMessage);
  }

  return envNames.reduce((acc, envName) => {
    acc[envName] = process.env[envName] as string;
    return acc;
  }, {} as { [key: string]: string });
};

export default checkEnvs;
