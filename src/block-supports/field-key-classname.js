import { hasBlockSupport, getBlockDefaultClassName} from '@wordpress/blocks';

import clsx from 'clsx';

const featureName = "gp/field-key-classes"


export function useBlockProps( props ) {

	
	const blockClass = getBlockDefaultClassName(props.name)
	const fieldClass = `${blockClass}--field-${props.fieldKey}`
	props.className = clsx(props.className, fieldClass)

	return props;
}


export default {
	edit: null,
	attributeKeys: ["fieldKey"],
	useBlockProps,
	hasSupport( name ) {
		return hasBlockSupport( name, featureName, false );
	},
};