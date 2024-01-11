const checkEnvs = (envNames: string[]): { [key: string]: string } => {
  const envs: { [key: string]: string } = {};
  const missingEnvs: string[] = [];

  for (const envName of envNames) {
    const envValue = process.env[envName];
    if (envValue) {
      envs[envName] = envValue;
    } else {
      missingEnvs.push(envName);
    }
  }

  if (missingEnvs.length > 0) {
    const envList = missingEnvs.join(", ");
    const errorMessage = `Missing required environment variable${
      missingEnvs.length > 1 ? "s" : ""
    }: ${envList}`;
    throw new Error(errorMessage);
  }

  return envs;
};

export default checkEnvs;
