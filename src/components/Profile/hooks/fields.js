
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
	console.log(profile)
	let fields = useRawFields()

	fields = fields.map( ( field ) => {
	
		let val
		if(field.type === "link"){
			val = profile?.profile?.[field.slug].url || false
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
	const value = profile.profile?.[fieldAttrs.fieldKey] ?? null;
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
	const { 
		fieldKey : localFieldKey = null,
		fieldType : localFieldType = null 
	} = attributes

	const { 
		'govpack/fieldKey' : inheritedFieldKey = null,
		'govpack/fieldType' : inheritedFieldType = null 
	} = context


	const isControlledByContext = inheritedFieldKey ? true : false;
	const fieldKey = isControlledByContext ? inheritedFieldKey : localFieldKey
	const fieldType = isControlledByContext ? inheritedFieldType : localFieldType

	let field = useRawField(fieldKey)

	const setFieldKey = (newKey) => {
		setAttributes({"fieldKey" : newKey})
	}

	return {
		field,
		fieldType,
		fieldKey,
		setFieldKey,
		isControlledByContext
	}
}
