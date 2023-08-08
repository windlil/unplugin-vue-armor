import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'

const enum TransformType {
  STYLE = 0,
  NAME = 1,
}

const styleExistReg = new RegExp(/<script(?:[\s\S]*?)style=(?:"|')(.*?)(?:"|')(?:[\s\S]*?)>/)
const nameExistReg = new RegExp(/<script(?:[\s\S]*?)name=(?:"|')(.*?)(?:"|')(?:[\s\S]*?)>/)
const stylePathReg = new RegExp(/style=((?:'|")\S*(?:'|"))/)
const nameReg = new RegExp(/name=((?:'|")\S*(?:'|"))/)

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
      const styleElString = code.match(styleExistReg)
      const nameElstring = code.match(nameExistReg)
      if (styleElString)
        code = transformCode(code, styleElString[0], TransformType.STYLE)
      if (nameElstring)
        code = transformCode(code, nameElstring[0], TransformType.NAME)
      return code
    },
  }
})

function transformCode(code: string, scriptElString: string, type: number): string {
  const initScriptString = scriptElString
  let styleString = ''
  let stylePath
  console.log(scriptElString)
  switch (type) {
    case 0:
      stylePath = stylePathReg.exec(scriptElString)
      if (stylePath) {
        scriptElString = scriptElString.replace(stylePath[0], '')
        code = code.replace(initScriptString, scriptElString)
        styleString = `\n<style scoped src=${stylePath[1]}></style>`
      }
      break
    case 1:
      break
  }
  console.log(type)
  return code + styleString
}
