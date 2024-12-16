

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from "@wordpress/block-editor"


import { useProfileFieldAttributes, useFieldsOfType } from "./../../components/Profile"
import { ProfileFieldsInspectorControl, ProfileFieldsToolBar } from "../../components/Controls/ProfileField"


function Edit( props ) {

	const blockProps = useBlockProps();
	const { setFieldKey, fieldKey, fieldType, isControlledByContext, value } =  useProfileFieldAttributes(props) 
	const fieldsofType = useFieldsOfType(props, fieldType)

	const href =  value?.url ?? false
	const label =  value?.linkText ?? false
	const showValue = value !== null

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
				{ (showValue) && (
					<a href={href}>{label}</a>
				) }

				{ (!fieldKey) && (
					<span>Please Select a Field </span> 
				) }
			</div>
			
		</>
	)
}

export {Edit}
export default Edit
