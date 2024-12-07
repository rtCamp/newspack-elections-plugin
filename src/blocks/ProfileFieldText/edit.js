

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from "@wordpress/block-editor"


import {useProfileField, useProfileFields, useProfileFromContext} from "./../../components/Profile"
import {ProfileFieldsInspectorControl} from "../../components/Controls/ProfileField"




function Edit( {attributes, setAttributes, context, clientId, ...props} ) {


	/**
	 * Get Data From Parent Blocks
	 */
	const { 
		'govpack/profileId' : profileId, 
		postType = false
	} = context

	/**
	 * Get Data From This Blocks
	 */
	const { 
		fieldKey = "name",
		fieldType = "text"
	} = attributes


	/**
	 * Get The Profile used
	 */
	const profile = useProfileFromContext(context) ?? {}
	const fields = 	useProfileFields(fieldType)

	const enhancedFields = fields.map( ( { slug, label, ...field } ) => {
		let val = profile?.[field.source]?.[slug] || false
		return {
			value: slug,
			label: label,
			info: val ?? "",
		} 
	}
	);


	/**
	 * Get Data From The Editor
	 */
	const blockProps = useBlockProps();

	const FieldType = useProfileField(fieldKey)
	const FieldValue = profile?.[FieldType.source]?.[fieldKey] || "[[" + fieldKey + "]]" ;

	const setFieldKey = (newKey) => {
		setAttributes({"fieldKey" : newKey})
	}

    return (
		<>
			<ProfileFieldsInspectorControl
				fieldKey = {fieldKey}
				setFieldKey = {setFieldKey}
				fieldType = {fieldType}
				fields = { enhancedFields }
			/>

			
			<div {...blockProps}>
				{FieldValue}
			</div>
			
		</>
	)
}

export {Edit}
export default Edit
