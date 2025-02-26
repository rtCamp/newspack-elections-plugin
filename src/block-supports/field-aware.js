
import clsx from 'clsx';

import { hasBlockSupport, getBlockDefaultClassName} from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from "@wordpress/block-editor"

import { ProfileFieldsInspectorControl, ProfileFieldsToolBar } from "./../components/Controls/ProfileField"
import { useFieldsOfType, useProfileFieldAttributes, useProfileFields } from './../components/Profile';

import { useField, useFields } from "./../profile-fields"

const featureName = "gp/field-aware"

const FIELD_TYPE_SCHEMA = {
	type: 'object',
	default: {
		"type" : "text" 
	}
};

function hasAttribute( attributes = {}, attribute = "field", subAttribute = false ) {

	// if the parent "field" attribute is missing, always false
	if ( attribute in ( attributes ?? {} )  === false) {
		return false
	}	

	// if we're not looking for a sub attribute then we can quick exit and return true 
	if(subAttribute === false){
		return true
	}

	// look for the subAttribute within field
	if ( subAttribute in ( attributes?.field ?? {} ) ) {
		return true
	}

	return false

}

export function useBlockProps( props ) {



	if(!hasAttribute(props)){
		return props;
	}
	
	const blockClass = getBlockDefaultClassName(props.name)
	const classNames = []

	if(hasAttribute(props, "field", 'type')){
		classNames.push(`${blockClass}--type-${props.field.type}`)
	}

	if(hasAttribute(props, "field", 'key')){
		classNames.push(`${blockClass}--key-${props.field.key}`)
	}

	props.className = clsx(props.className, classNames)

	return props;
}

export function addAttribute( settings ) {
	// Allow blocks to specify their own attribute definition with default values if needed.
	if(hasAttribute(settings.attributes)){
		return settings;
	}

	if ( hasBlockSupport( settings, featureName ) ) {
		// Gracefully handle if settings.attributes is undefined.
		settings.attributes = {
			...settings.attributes,
			field: FIELD_TYPE_SCHEMA,
		};
	}

	return settings;
}

const FieldAwareEdit = (props) => {
	
	const {clientId} = props
	const attributes = useSelect( (select) => select( blockEditorStore ).getBlockAttributes( clientId ) || {} )
	
	const {updateBlockAttributes} = useDispatch(blockEditorStore)
	
	const { setField : setFieldAttribute, isControlledByContext, fieldKey, fieldType, ...restProfileProps } =  useProfileFieldAttributes(props) 
	const fieldsofType = useFieldsOfType(props, fieldType)
	const fields = useProfileFields(props)
	const availableFields = useFields()
	
	const contextProvidingBlock = useSelect( (select) => {
		const profileRows = select(blockEditorStore).getBlockParentsByBlockName(clientId, "govpack/profile-row")
		const parentRowClientId = profileRows.at(profileRows.length - 1)
		return select(blockEditorStore).getBlock(parentRowClientId)
	} )

	const updateContextProviderAttribute = (attrs) => {
		updateBlockAttributes(contextProvidingBlock.clientId, attrs )
	}


	const setFieldContext = (newValue) => {
		updateContextProviderAttribute({"field" : newValue})
	}
	
	const setFieldKey = isControlledByContext ? setFieldContext : setFieldAttribute
	
	const onSelectField = (fieldKey) => {
	
		const field = availableFields.find( (f) => f.slug === fieldKey)
		const newFieldAttr = {
			type : field.type,
			key: fieldKey
		}

		setFieldKey(newFieldAttr)
	}
	
	return (
		<>
			<ProfileFieldsInspectorControl
				fieldKey = {fieldKey}
				onSelectField = {onSelectField}
				fieldType = {fieldType}
				fields = { fields }
				showFieldsWithEmptyValues = {true}
				disableEmptyFields = {false}
			/> 

			<ProfileFieldsToolBar 
				fieldKey = {fieldKey}
				onSelectField = { onSelectField }
				fieldType = {fieldType}
				fields = { fields }
				showFieldsWithEmptyValues = {true}
				disableEmptyFields = {false}
			/>
		</>
	)

}

const migrateLegacyAttrsToField =  (attributes, innerBlocks) => {

	let field = {}
	const {
		fieldType = null, 
		fieldKey = null, 
		...restAttrs
	} = attributes

	if(fieldType){
		field.type = fieldType
	}

	if(fieldKey){
		field.key = fieldKey
	}

	return [
		{...restAttrs, field},
		innerBlocks
	]
}

const isEligibleForFieldAttrMigration = (attributes, innerBlocks, data) => {

	const hasFieldAttr = hasAttribute(attributes)
	const hasDeprecatedFieldTypeAttr = hasAttribute(attributes, "fieldType")
	const hasDeprecatedFieldKeyAttr = hasAttribute(attributes, "fieldKey")

	return hasDeprecatedFieldTypeAttr || hasDeprecatedFieldKeyAttr
}

export default {
	edit: FieldAwareEdit,
	attributeKeys: ["field"],
	addAttribute: addAttribute,
	useBlockProps,
	hasSupport( name ) {
		return hasBlockSupport( name, featureName, false );
	},
};

export { migrateLegacyAttrsToField, hasAttribute, isEligibleForFieldAttrMigration }