import { nameReg, stylePathReg, templateReg } from './reg'

export function transformCode(code: string, scriptElString: string, type: number): string {
  switch (type) {
    case 0:
      code = transformStyle(scriptElString, code)
      break
    case 1:
      code = transformName(scriptElString, code)
      break
    case 2:
      code = transformTemplate(scriptElString, code)
      break
  }
  return code
}

function transformStyle(scriptElString: string, code: string): string {
  const initScriptString = scriptElString
  let styleString = ''
  const stylePath = stylePathReg.exec(scriptElString)
  if (stylePath) {
    scriptElString = scriptElString.replace(stylePath[0], '')
    code = code.replace(initScriptString, scriptElString)
    styleString = `\n<style scoped src=${stylePath[1]}></style>`
  }
  return code + styleString
}

function transformName(scriptElString: string, code: string): string {
  const initScriptString = scriptElString
  let name
  const namePath = nameReg.exec(scriptElString)
  if (namePath) {
    name = namePath[1]
    scriptElString = scriptElString.replace(namePath[0], '')
    scriptElString += `
      defineOptions({
        name: ${name}
      })
    `
    code = code.replace(initScriptString, scriptElString)
  }
  return code
}

function transformTemplate(scriptElString: string, code: string) {
  const initScriptString = scriptElString
  let templateString = ''
  const templatePath = templateReg.exec(scriptElString)
  if (templatePath) {
    scriptElString = scriptElString.replace(templatePath[0], '')
    code = code.replace(initScriptString, scriptElString)
    templateString = `\n<template src=${templatePath[1]}></template>`
  }
  return code + templateString
}