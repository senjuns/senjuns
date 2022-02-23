export const getPublicPath = (path: string) => {
  const subPaths = path.split('/');
  return subPaths
    .map((subPath, index) =>
      index === 0 ? `https://${subPath}.s3.eu-central-1.amazonaws.com` : subPath
    )
    .join('/');
};
