import sharp from 'sharp'

export async function optimizeImage(imagePath: string) {
  try {
    await sharp(imagePath)
      .resize(1200) // Max width
      .webp({ quality: 65 })
      .toFile(imagePath.replace(/\.[^/.]+$/, ".webp"))
  } catch (error) {
    console.error('Error optimizing image:', error)
  }
} 