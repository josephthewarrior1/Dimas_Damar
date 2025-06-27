export function assetPath(path) {
    // Untuk development
    if (import.meta.env.DEV) {
      return `/assets/${path}`;
    }
    // Untuk production (GitHub Pages)
    return `/wedding_invitation/assets/${path}`;
  }