import { hasBlockSupport, getBlockDefaultClassName} from '@wordpress/blocks';

import clsx from 'clsx';

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

export default {
	edit: null,
	attributeKeys: ["fieldKey"],
	useBlockProps,
	addAttribute : addAttribute,
	hasSupport( name ) {
		return hasBlockSupport( name, featureName, false );
	},
};