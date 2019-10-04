
import render from '../../src/index'

const command = {
  name: 'render',
  dependencies: []
}

command.cli = `
Usage:
  script render
Description:
  render all images
`

command.task = async () => {
  await render.permutation()
}

export default command

