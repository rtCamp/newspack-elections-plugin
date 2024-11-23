/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { HorizontalRule } from '@wordpress/components';

import { 
	useBlockProps,
	getColorClassName,
	__experimentalUseColorProps as useColorProps
} from "@wordpress/block-editor"

import { SpacerControls } from '@wordpress/block-library/src/spacer/controls';

function Edit( {attributes, setAttributes, context, ...props} ) {
	

	const { backgroundColor, opacity, style } = attributes;
	const colorProps = useColorProps( attributes );
	const currentColor = colorProps?.style?.backgroundColor;
	const hasCustomColor = !! style?.color?.background;

	const colorClass = getColorClassName( 'color', backgroundColor );

	const className = clsx(
		{
			'has-text-color': backgroundColor || currentColor,
			[ colorClass ]: colorClass,
			'has-css-opacity': opacity === 'css',
			'has-alpha-channel-opacity': opacity === 'alpha-channel',
		},
		colorProps.className
	);

	const styles = {
		
	};

	if(hasCustomColor){
		styles = {
			...styles,
			color: currentColor,
			backgroundColor: currentColor
		}
	};

	const blockProps = useBlockProps({
		className,
		style: styles
	});

	
	return (
		<>
			<HorizontalRule {...blockProps} />
		</>
	)
}

export {Edit}
export default Edit
