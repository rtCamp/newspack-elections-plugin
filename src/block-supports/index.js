/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { memo, useEffect, useState } from "@wordpress/element"

/**
 * Internal dependencies
 */
import fieldType from "./field-type"
import fieldKey from "./field-key"
/**
 * External dependencies
 */
import clsx from 'clsx';



const features = [
	fieldType,
	fieldKey
]

export const registerBlockSupports = () => {

	const withGPBlockSupports = createHigherOrderComponent(
		(OriginalBlockListBlock) => ( props ) => {
	
			const [ allWrapperProps, setAllWrapperProps ] = useState(
				Array( features.length ).fill( undefined )
			);

			return [
				...features.map( ( feature, i ) => {

					const {
						hasSupport,
						attributeKeys = [],
						useBlockProps,
						isMatch,
					} = feature;

					const neededProps = {};

					for ( const key of attributeKeys ) {
						if ( props.attributes[ key ] ) {
							neededProps[ key ] = props.attributes[ key ];
						}
					}

					if (
						// Skip rendering if none of the needed attributes are
						// set.
						! Object.keys( neededProps ).length ||
						! hasSupport( props.name ) ||
						( isMatch && ! isMatch( neededProps ) )
					) {
						return null;
					}

					return (
						<BlockPropsPure
							// We can use the index because the array length
							// is fixed per page load right now.
							key={ i }
							index={ i }
							useBlockProps={ useBlockProps }
							// This component is pure, so we must pass a stable
							// function reference.
							setAllWrapperProps={ setAllWrapperProps }
							name={ props.name }
							clientId={ props.clientId }
							// This component is pure, so only pass needed
							// props!!!
							{ ...neededProps }
						/>
					);

				}),
				<OriginalBlockListBlock
					key="edit"
					{ ...props }
					wrapperProps={ 
						allWrapperProps.filter( Boolean )
							.reduce( ( acc, wrapperProps ) => {
								return {
									...acc,
									...wrapperProps,
									className: clsx(
										acc.className,
										wrapperProps.className
									),
									style: {
										...acc.style,
										...wrapperProps.style,
									},
								};
							}, 
							props.wrapperProps || {} 
						) 
					}
				/>
			]
		},
		'withGPBlockSupports'
	) 

	addFilter(
		'editor.BlockListBlock',
		'gp/block-supports/addFieldTypeClassname',
		withGPBlockSupports
	);
}

function BlockProps( {
	index,
	useBlockProps: hook,
	setAllWrapperProps,
	...props
} ) {

	const wrapperProps = hook( props );
	

	const setWrapperProps = ( next ) =>
		setAllWrapperProps( ( prev ) => {
			const nextAll = [ ...prev ];
			nextAll[ index ] = next;
			return nextAll;
		} );
	// Setting state after every render is fine because this component is
	// pure and will only re-render when needed props change.
	useEffect( () => {
		// We could shallow compare the props, but since this component only
		// changes when needed attributes change, the benefit is probably small.
		setWrapperProps( wrapperProps );
		return () => {
			setWrapperProps( undefined );
		};
	} );
	return null;
}

const BlockPropsPure = memo( BlockProps );	