import { hasBlockSupport, getBlockDefaultClassName} from '@wordpress/blocks';

import clsx from 'clsx';

const featureName = "gp/field-type"

const FIELD_TYPE_SCHEMA = {
	type: 'string',
	default: "text"
};

export function useBlockProps( props ) {

	const blockClass = getBlockDefaultClassName(props.name)
	const fieldClass = `${blockClass}--type-${props.fieldType}`
	props.className = clsx(props.className, fieldClass)

	return props;
}

export function addAttribute( settings ) {
	// Allow blocks to specify their own attribute definition with default values if needed.
	if ( 'type' in ( settings.attributes?.fieldType ?? {} ) ) {
		return settings;
	}
	if ( hasBlockSupport( settings, featureName ) ) {
		// Gracefully handle if settings.attributes is undefined.
		settings.attributes = {
			...settings.attributes,
			fieldType: FIELD_TYPE_SCHEMA,
		};
	}

	return settings;
}

export default {
	edit: null,
	attributeKeys: ["fieldType"],
	addAttribute: addAttribute,
	useBlockProps,
	hasSupport( name ) {
		return hasBlockSupport( name, featureName, false );
	},
};