import { useBlockProps } from "@wordpress/block-editor"
import { ProfileFieldsInspectorControl, ProfileFieldsToolBar } from "../../components/Controls/ProfileField"
import { useFieldsOfType, useProfileFieldAttributes } from './../../components/Profile';

export const FieldBlockEdit = (props) => {

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