import { useSelect } from "@wordpress/data"
import { store } from "."

export const useField = ( slug ) => {
	return useSelect( (select) => {
		return select(store).getField(slug) ?? {}
	}, [slug] )
}

export const useFields = () => {
	return useSelect( (select) => {
		return select(store).getFields() ?? []
	} )
}

export const useFieldType = ( slug ) => {
	return useSelect( (select) => {
		return select(store).getFieldType(slug) ?? {}
	}, [slug] )
}

export const useFieldTypes = () => {
	return useSelect( (select) => {
		return select(store).getFieldTypes() ?? []
	} )
}

export const useFieldsOfType = ( type ) => {
	return useSelect( (select) => {
		return select(store).getFieldsOfType(type) ?? []
	} )
}


export const useFieldAttributes = (props) => {

	const { attributes, setAttributes, context } = props
	const { field = {} } = attributes
	const { 'govpack/field' :inheritedField = {} } = context

	let { 
		key : localFieldKey = null,
		type : localFieldType = null 
	} = field

	if(!localFieldKey){
		localFieldKey = attributes.fieldKey
	}

	if(!localFieldType){
		localFieldType = attributes.fieldType
	}

	let { 
		'key' : inheritedFieldKey = null,
		'type' : inheritedFieldType = null 
	} = inheritedField

	if(!inheritedFieldKey){
		inheritedFieldKey = context["govpack/fieldKey"]
	}

	if(!inheritedFieldType){
		inheritedFieldType = context["govpack/fieldType"]
	}


	const isControlledByContext = inheritedFieldKey ? true : false;
	const fieldKey = isControlledByContext ? inheritedFieldKey : localFieldKey
	const fieldType = isControlledByContext ? inheritedFieldType : localFieldType

	const setField = (newFieldOrType, newKey = null) => {

		if(isObject(newFieldOrType)){
			setFieldFromObject(newFieldOrType)
			return
		}

		if(newFieldOrType === null || newKey === null){
			console.error("Neither field Type or key can be null")
		}

		// ToDo
		// Block attributes do not check the sub attributes, 
		// so we should check that these match how we 
		// specify them

		const newField = {
			type : newFieldOrType,
			key : newKey,
		}
		
		setFieldFromObject(newField)
	}
	
	const setFieldFromObject = (newField) => {
		setAttributes({"field" : newField})
	}

	const setFieldType = (newType) => {
		
		let { field } = attributes
		field = {
			...field,
			"type" : newType
		}
		setField(field)
	}

	const setFieldKey = (newKey) => {
		
		let { field } = attributes
		field = {
			...field,
			"key" : newKey
		}
		setField(field)
	}

	return {
		field: useField(fieldKey),
		fieldType,
		fieldKey,
		setFieldKey,
		setField,
		isControlledByContext
	}
}
