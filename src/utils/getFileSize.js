export const getFileSize = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentLength = response.headers.get("Content-Length");

    if (!contentLength) {
      console.warn(`Content-Length header not found for ${url}`);
      return null;
    }

    const sizeInBytes = parseInt(contentLength, 10);
    return sizeInBytes;
  } catch (error) {
    console.error(`Failed to fetch file size for ${url}:`, error);
    return null;
  }
};
