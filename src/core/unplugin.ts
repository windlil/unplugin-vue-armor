import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'

const styleExistReg = new RegExp(/<script(?:[\s\S]*?)style=(?:"|')(.*?)(?:"|')(?:[\s\S]*?)>/)
const stylePathReg = new RegExp(/style=((?:'|")\S*(?:'|"))/)

export default createUnplugin(() => {
  const filter = createFilter(
    [/\.vue$/],
    [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
  )
  return {
    name: 'unplugin-vue-armor',
    enforce: 'pre',
    transformInclude(id: string) {
      return filter(id)
    },
    transform(code: string) {
      const scriptElString = code.match(styleExistReg)
      if (scriptElString)
        code = transformCode(code, scriptElString[0])
      return code
    },
  }
})

function transformCode(code: string, scriptElString: string): string {
  const stylePath = stylePathReg.exec(scriptElString)
  let styleString = ''
  if (stylePath) {
    code = code.replace(stylePath[0], '')
    styleString = `\n<style scoped src=${stylePath[1]}></style>`
  }
  return code + styleString
}
