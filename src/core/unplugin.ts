import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import { transformCode } from './transform'
import { nameExistReg, styleExistReg, templateExistReg } from './reg'
import { TransformType } from './typs'

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
      if (styleElString)
        code = transformCode(code, styleElString[0], TransformType.STYLE)

      const nameElstring = code.match(nameExistReg)
      if (nameElstring)
        code = transformCode(code, nameElstring[0], TransformType.NAME)

      const templateElstring = code.match(templateExistReg)
      if (templateElstring)
        code = transformCode(code, templateElstring[0], TransformType.TEMPLATE)
      return code
    },
  }
})
