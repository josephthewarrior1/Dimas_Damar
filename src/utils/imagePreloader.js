const imageCache = new Map();

export async function preloadImage(url) {
  if (imageCache.has(url)) {
    return imageCache.get(url);
  }

  const promise = new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(url);
    img.onerror = () => resolve(url); // Tetap resolve meski error
  });

  imageCache.set(url, promise);
  return promise;
}

export async function preloadAllImages(imageUrls) {
  await Promise.all(imageUrls.map(url => preloadImage(url)));
}