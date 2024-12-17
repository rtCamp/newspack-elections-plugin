

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from "@wordpress/block-editor"

/**
 * Internal dependencies
 */
import { ProfileFieldsInspectorControl, ProfileFieldsToolBar } from "../../components/Controls/ProfileField"
import { useFieldsOfType, useProfileFieldAttributes } from './../../components/Profile';

const FieldBlockEdit = (props) => {

	const blockProps = useBlockProps();
	const { setFieldKey, fieldKey, fieldType, isControlledByContext } =  useProfileFieldAttributes(props) 
	const fieldsofType = useFieldsOfType(props, fieldType)
	const { children } = props

	return (
		<div {...blockProps}>

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

			{children}

		</div>
	)
}

function Edit( props ) {

	const { fieldKey, value, field } =  useProfileFieldAttributes(props) 

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
			<FieldBlockEdit {...props} >
				{FieldValue}
			</FieldBlockEdit>
		</>
	)
}



export {Edit}
export default Edit
