import FieldType from "./field"
import Link from "./link"
import Text from "./text"


const fieldTypes = {}

const availableFieldTypes = [
	Link, Text
]

export const getFieldTypeObject = (type) => {
	if(hasFieldType(type)){
		return fieldTypes[type]
	}

	return null
}

export const getAllFieldTypeObjects = () => {
	return fieldTypes;
}

export const createFieldTypes = (types) => {
	console.log(types)
	types.forEach( (type) => {
		createFieldType(type)
	})
}

export const createFieldType = (type) => {
	if(hasFieldType(type.slug)){
		return
	}

	let fieldClass = availableFieldTypes.find( (ft) => ft.slug === type.slug) ?? FieldType
	console.log(fieldClass)
	fieldTypes[type.slug] =  new fieldClass.prototype.constructor(type)
}

export const hasFieldType = (type) => {
	return Object.hasOwn(fieldTypes, type)
}

export {Link, FieldType}