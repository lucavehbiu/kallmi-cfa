const { optimizeImage } = require('../src/utils/imageOptimizer')
const path = require('path')
const fs = require('fs')

const imageDir = path.join(process.cwd(), 'public/images')

async function optimizeAllImages() {
  const files = fs.readdirSync(imageDir)
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      await optimizeImage(path.join(imageDir, file))
    }
  }
}

optimizeAllImages() 