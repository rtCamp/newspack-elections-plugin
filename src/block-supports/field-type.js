import { hasBlockSupport, getBlockDefaultClassName} from '@wordpress/blocks';

import clsx from 'clsx';

const featureName = "gp/field-type-classes"


export function useBlockProps( props ) {

	const blockClass = getBlockDefaultClassName(props.name)
	const fieldClass = `${blockClass}--type-${props.fieldType}`
	props.className = clsx(props.className, fieldClass)

	return props;
}


export default {
	edit: null,
	attributeKeys: ["fieldType"],
	useBlockProps,
	hasSupport( name ) {
		return hasBlockSupport( name, featureName, false );
	},
};