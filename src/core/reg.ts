export const styleExistReg = new RegExp(/<script(?:[\s\S]*?)style=(?:"|')(.*?)(?:"|')(?:[\s\S]*?)>/)

export const nameExistReg = new RegExp(/<script(?:[\s\S]*?)name=(?:"|')(.*?)(?:"|')(?:[\s\S]*?)>/)

export const templateExistReg = new RegExp(/<script(?:[\s\S]*?)template=(?:"|')(.*?)(?:"|')(?:[\s\S]*?)>/)

export const stylePathReg = new RegExp(/style=((?:'|")\S*(?:'|"))/)

export const nameReg = new RegExp(/name=((?:'|")\S*(?:'|"))/)

export const templateReg = new RegExp(/template=((?:'|")\S*(?:'|"))/)