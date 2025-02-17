import {isEmpty} from "lodash"
import { useBlockProps } from "@wordpress/block-editor"
import { ProfileFieldsInspectorControl, ProfileFieldsToolBar } from "../../components/Controls/ProfileField"
import { useFieldsOfType, useProfileFieldAttributes } from './../../components/Profile';

export const FieldBlockEdit = (props) => {

	//const {editProps = {}} = props
	const blockProps = useBlockProps();
	//console.log("FieldBlockEdit blockProps", blockProps, editProps)
	
	const { isControlledByContext } =  useProfileFieldAttributes( props ) 

	const { 
		children = [],
		defaultValue = "N/A",
		hasValue = false
	} = props

	const hasChildren = (children.length > 0)

	
	return (
		<div {...blockProps}>

			{!isControlledByContext && (
				<>
				{/*
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
				*/}
				</>
			)}

			{hasChildren && hasValue && (<>{children}</>)}
			{(!hasValue || !hasChildren) && (<span>{defaultValue}</span>)}

		</div>
	)
}