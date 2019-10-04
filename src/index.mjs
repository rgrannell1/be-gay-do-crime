
import constants from './constants'
import canvasModule from 'canvas'
import * as fs from 'fs'

import Rainbow from 'rainbowvis.js'

const rainbow = new Rainbow()

const render = {}

const getMask = () => {
  const canvas = canvasModule.createCanvas(constants.width, constants.height)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, constants.width, constants.height)

  ctx.font = '570px Impact'

  ctx.fillStyle = 'white'
  ctx.fillText('BE GAY DO CRIME', constants.marginX, 750)

  for (let ith = 0; ith < 10; ++ith) {
    ctx.fillText('BE GAY DO CRIME', constants.marginX, 750 * (ith + 1))
  }

  return { canvas, ctx }
}

const getBackground = () => {
  const canvas = canvasModule.createCanvas(constants.width, constants.height)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, constants.width, constants.height)

  ctx.font = '30px Impact'

  for (let ith = 0; ith < 100; ++ith) {
    for (let jth = 0; jth < 100; ++jth) {
      let xPos = 200 * (ith + 1)
      let yPos = 40 * (jth + 1)

      let colour = rainbow.colourAt(ith * 5)
      ctx.fillStyle = `#${colour}`

      ctx.fillText('be gay do crime', xPos - 200, yPos)
    }
  }

  return { ctx, canvas }
}

function getPixel (imgData, ith) {
  const data = imgData.data
  return [data[ith], data[ith + 1], data[ith + 2], data[ith + 3]]
}

render.permutation = async () => {
  const maskData = getMask()
  const backgroundData = getBackground()

  const images = {
    mask: maskData.ctx.getImageData(0, 0, constants.width, constants.height),
    background: backgroundData.ctx.getImageData(0, 0, constants.width, constants.height)
  }

  for (let ith = 0; ith < images.mask.data.length; ith += 4) {
    let maskPixel = getPixel(images.mask, ith)
    let isOpaque = maskPixel[0] === 0 && maskPixel[1] === 0 && maskPixel[2] === 0

    if (isOpaque) {
      images.background.data[ith] = 0
      images.background.data[ith + 1] = 0
      images.background.data[ith + 2] = 0
      images.background.data[ith + 3] = 255
    }
  }

  backgroundData.ctx.putImageData(images.background, 0, 0)

  fs.writeFileSync(constants.paths.square, backgroundData.canvas.toBuffer())
}

export default render
