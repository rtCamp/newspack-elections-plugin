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
	__experimentalUseColorProps as useColorProps,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles
} from "@wordpress/block-editor"

import SpacerControls from './controls'

function Edit( {attributes, setAttributes, context, ...props} ) {

	const {
		styles : originalStyles = {}, 
		...blockProps
	} = useBlockProps();

	let styles = {...originalStyles}

	console.log("Seperator", blockProps, props, attributes, context)

	const { 
		backgroundColor, 
		opacity, 
		style = {},
		height : ownHeight = false
	} = attributes;

	const { 
		'govpack/separatorHeight' : parentHeight = false,
		'govpack/separatorMargin' : parentMargin = false
	} = context;

	
	/**
	 * Use the blocks height from its Attribute, fallback to parent if not set
	 * This lets the block override the passed context
	 */
	const height = ownHeight || parentHeight

	styles = {
		...styles,
		borderTopWidth : height
	}

	if(parentMargin && ! style?.spacing?.margin){

		console.log("insert new styles");

		const fakeAttrs = {
			style : {
				spacing: {
					margin : parentMargin
				}
			}
		}

		let fakeBlockProps = getSpacingClassesAndStyles(fakeAttrs)
	
		styles = {
			...styles,
			...fakeBlockProps?.style ?? {}
		}

	}

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

	
	
	if(hasCustomColor){
		styles = {
			...styles,
			color: currentColor,
			backgroundColor: currentColor
		}
	};

	
	return (
		<>	
			<SpacerControls 
				orientation = "vertical"
				height = {height}
				setAttributes={setAttributes}
				isResizing={false}
			/>
			<HorizontalRule { ...useBlockProps({
				className,
				style : styles
				}) } 
			/>
		</>
	)
}

export {Edit}
export default Edit
