export const getPublicPath = (path: string) => {
  const subPaths = path.split('/');
  return subPaths
    .map((subPath, index) =>
      index === 0 ? `https://${subPath}.s3.us-west-2.amazonaws.com` : subPath
    )
    .join('/');
};
