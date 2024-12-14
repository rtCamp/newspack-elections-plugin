

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from "@wordpress/block-editor"


import { useProfileFromContext, useProfileField} from "./../../components/Profile"
import {ProfileFieldsInspectorControl, ProfileFieldsToolBar} from "../../components/Controls/ProfileField"

import { compose, createHigherOrderComponent } from '@wordpress/compose';


import { useFieldsOfType, useProfileFieldAttributes } from './../../components/Profile';


function Edit( props ) {

	const blockProps = useBlockProps();
	
	const { setFieldKey, fieldKey, fieldType, isControlledByContext, profile, value, field } =  useProfileFieldAttributes(props) 
	const fieldsofType = useFieldsOfType(props, fieldType)

	/**
	 * Get Data From The Editor
	 */
	
	const profileValue = () => {

		
		if(field.type === "link"){
			let url = value?.url;
			return (<a href={ url }>{ url }</a>)
		}

		if(typeof value === "object"){
			return ""
		}

		return value.trim()
	}

	const FieldValue = profileValue(fieldKey)

    return (
		<>
		

			{!isControlledByContext && (
				<>
					<ProfileFieldsInspectorControl
						fieldKey = {fieldKey}
						setFieldKey = {setFieldKey}
						fieldType = {fieldType}
						fields = { fieldsofType }
					/>

					<ProfileFieldsToolBar 
						fieldKey = {fieldKey}
						setFieldKey = {setFieldKey}
						fieldType = {fieldType}
						fields = { fieldsofType }
					/>
				</>
			)}

			<div {...blockProps}>
				{FieldValue}
			</div>
			
		</>
	)
}



export {Edit}
export default Edit
