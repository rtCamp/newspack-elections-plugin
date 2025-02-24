
import { isObject } from "lodash"
import {useSelect} from "@wordpress/data"
import { store as coreStore } from "@wordpress/core-data";

import { useProfileFromContext } from "./profile";

export const useFieldsOfType = (props, fieldType) => {
	const fields = useProfileFields(props)
	const fieldsofType = fields.filter( (f) => f.type === fieldType)
	return fieldsofType
}


export const useRawFields = () => {

	const fields = useSelect( ( select ) => {
		return select( coreStore ).getEntityRecords( 'govpack', 'fields', { per_page: '-1' } ) ?? [];
	}, [ ] );

	return fields
}


export const useProfileFields = (props) => {

	const {context} = props

	const profile = useProfileFromContext(context) ?? {}
	
	let fields = useRawFields()

	fields = fields.map( ( field ) => {
	
		let val
		if(field.type === "link"){
			val = profile?.profile?.[field.slug].url || false
		} else if(field.type === "taxonomy"){

			val = profile?.profile?.[field.slug]

			if(val.length < 1){
				val = ""
			} else {
				val = val.map((f) => f.name).join(", ")
			}

		} else {
			val = profile?.profile?.[field.slug] || false
		}
		

		if(val && (typeof val === "string")){
			val = val.trim()
		}

		return {
			...field,
			'value' : val
		} 
	})

	return fields
}


export const useProfileFieldAttributes = (props) => {

	
	const {context} = props
	const fieldAttrs  = useFieldAttributes(props)
	const profile = useProfileFromContext( context )
	const value = profile?.profile?.[fieldAttrs?.fieldKey] ?? null;
	const profileId = profile.id
	


	return {
		profileId,
		profile,
		value,
		...fieldAttrs
	}
}


export const useRawField = ( fieldKey ) => {
	
	const fields = useRawFields()

	
	if(fields.length === 0){
		return new Object()
	}

	if(fieldKey === null){
		return new Object()
	}

	const field = fields.filter( (field) => {
		return field.slug === fieldKey
	})[0] ?? null;

	return field  ;
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
		field: useRawField(fieldKey),
		fieldType,
		fieldKey,
		setFieldKey,
		setField,
		isControlledByContext
	}
}
