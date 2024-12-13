

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from "@wordpress/block-editor"


import { useProfileFields, useProfileField, useProfileFromContext} from "./../../components/Profile"
import {ProfileFieldsInspectorControl} from "../../components/Controls/ProfileField"

/**
 * Returns a collection of stuff the block might need
 * 
 * The Profile Entity/Post Type
 * The Profile Field Schema/Types
 */
const useGPProfile = () => {


}

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
		fieldKey = "more",
		fieldType = "link"
	} = attributes

	const setFieldKey = (newKey) => {
		setAttributes({"fieldKey" : newKey})
	}

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
	const FieldValue = profile?.profile?.[fieldKey] || {} ;

	console.log(FieldValue)	
	const href =  FieldValue?.url ?? false
	const label =  FieldValue?.linkText ?? false
	console.log(href, label)	

    return (
		<>
			<ProfileFieldsInspectorControl
				fieldKey = {fieldKey}
				setFieldKey = {setFieldKey}
				fieldType = {fieldType}
				fields = { enhancedFields }
			/>

			
			<div {...blockProps}>
				<a href={href}>{label}</a>
			</div>
			
		</>
	)
}

export {Edit}
export default Edit
