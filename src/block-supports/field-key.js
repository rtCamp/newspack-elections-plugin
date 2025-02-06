/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { hasBlockSupport, getBlockDefaultClassName} from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from "@wordpress/block-editor"

/**
 * Internal dependencies
 */
import { ProfileFieldsInspectorControl, ProfileFieldsToolBar } from "./../components/Controls/ProfileField"
import { useFieldsOfType, useProfileFieldAttributes } from './../components/Profile';

const featureName = "gp/field-key"

const FIELD_KEY_SCHEMA = {
	type: 'string'
};

export function useBlockProps( props ) {
	const blockClass = getBlockDefaultClassName(props.name)
	const fieldClass = `${blockClass}--field-${props.fieldKey}`
	props.className = clsx(props.className, fieldClass)
	return props;
}

export function addAttribute( settings ) {
	// Allow blocks to specify their own attribute definition with default values if needed.
	if ( 'type' in ( settings.attributes?.fieldKey ?? {} ) ) {
		return settings;
	}
	if ( hasBlockSupport( settings, featureName ) ) {
		// Gracefully handle if settings.attributes is undefined.
		settings.attributes = {
			...settings.attributes,
			fieldKey: FIELD_KEY_SCHEMA,
		};
	}

	return settings;
}

const Edit = (props) => {

	const {clientId} = props
	const attributes = useSelect( (select) => select( blockEditorStore ).getBlockAttributes( clientId ) || {} )

	
	const {fieldKey, fieldType} = attributes
	const { setFieldKey, isControlledByContext } =  useProfileFieldAttributes(props) 
	const fieldsofType = useFieldsOfType(props, fieldType)

	return (
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
	)
}

export default {
	edit: Edit,
	attributeKeys: ["fieldKey"],
	useBlockProps,
	addAttribute : addAttribute,
	hasSupport( name ) {
		return hasBlockSupport( name, featureName, false );
	},
};