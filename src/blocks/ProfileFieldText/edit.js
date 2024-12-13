

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from "@wordpress/block-editor"


import { useProfileFields, useProfileFromContext, useProfileField, useProfileData} from "./../../components/Profile"
import {ProfileFieldsInspectorControl, ProfileFieldsToolBar} from "../../components/Controls/ProfileField"

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
		'govpack/fieldKey' : inheritedFieldKey = null, 
		postType = false
	} = context

	/**
	 * Get Data From This Blocks
	 */
	const { 
		fieldKey : localFieldKey = null,
		fieldType = "text"
	} = attributes

	const isControlledByContext = inheritedFieldKey ? true : false;
	const fieldKey = isControlledByContext ? inheritedFieldKey : localFieldKey

	const setFieldKey = (newKey) => {
		setAttributes({"fieldKey" : newKey})
	}

	/**
	 * Get The Profile used
	 */
	const {profile, fields} = useProfileData(context)




	/**
	 * Get Data From The Editor
	 */
	const blockProps = useBlockProps();

	const profileValue = (key) => {
		const Field = useProfileField(key)
		if(Field.type === "link"){
			let url = profile?.profile?.[key]?.url;
			return (<a href={ url }>{ url }</a>)
		}

		if(typeof profile?.profile?.[key] === "object"){
			return ""
		}

		return profile?.profile?.[key]
	}

	const FieldValue = profileValue(fieldKey)
	const fieldsofType = fields.filter( (f) => f.type === fieldType)
    return (
		<>
			{!isControlledByContext && (
				<ProfileFieldsInspectorControl
					fieldKey = {fieldKey}
					setFieldKey = {setFieldKey}
					fieldType = {fieldType}
					fields = { fieldsofType }
				/>
			)}

			{!isControlledByContext && (
				<ProfileFieldsToolBar 
					fieldKey = {fieldKey}
					setFieldKey = {setFieldKey}
					fieldType = {fieldType}
					fields = { fieldsofType }
				/>
			)}

			<div {...blockProps}>
				{FieldValue}
			</div>
			
		</>
	)
}

export {Edit}
export default Edit
