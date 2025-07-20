export const imageConfig = {
  // Enhanced image optimization settings
  limitInputPixels: 268402689, // ~16K x 16K pixels
  jpeg: {
    quality: 85,
    progressive: true,
    optimizeScans: true,
    mozjpeg: true
  },
  png: {
    quality: 85,
    progressive: true,
    compressionLevel: 9,
    adaptiveFiltering: true
  },
  webp: {
    quality: 85,
    lossless: false,
    nearLossless: true,
    smartSubsample: true
  },
  avif: {
    quality: 85,
    lossless: false,
    speed: 5
  }
}
