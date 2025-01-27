import {isEmpty} from "lodash"

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, HeadingLevelDropdown, AlignmentControl, BlockControls, InspectorControls, PlainText} from "@wordpress/block-editor"
import { store as coreStore, useEntityProp } from '@wordpress/core-data'
import { useSelect } from '@wordpress/data';
import { useMemo } from "@wordpress/element"
import { ToggleControl, TextControl, PanelBody } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { FieldBlockEdit } from '../../components/field-block-edit';
import { useProfileFieldAttributes } from './../../components/Profile';





function Edit( props ) {

	const { fieldKey, field, value, profileId, ...restField } =  useProfileFieldAttributes(props) 
	const blockProps = useBlockProps()

	const { context, attributes, setAttributes } = props
	const { postType } = context
	const { level, textAlign, levelOptions, isLink, linkTarget, rel } = attributes

	const postTypeSupportsTitle = useSelect(
		( select ) => {
			return !! select( coreStore ).getPostType( postType )?.supports?.title;
		},
		[ postType ]
	);

	const [ link ] = useEntityProp( 'postType', postType, 'link', profileId );
	const hasValue = !isEmpty(value)

	if(!postTypeSupportsTitle){
		return null
	}

	const TagName = level === 0 ? 'p' : `h${ level }`;

    return (
		<>
			<BlockControls group="block">
				<HeadingLevelDropdown
					value={ level }
					options={ levelOptions }
					onChange={ ( newLevel ) =>
						setAttributes( { level: newLevel } )
					}
				/>
				<AlignmentControl
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Make title a link' ) }
						onChange={ () =>
							setAttributes( { isLink: ! isLink } )
						}
						checked={ isLink }
					/>
					{ isLink && (
						<>
							<ToggleControl
								__nextHasNoMarginBottom
								label={ __( 'Open in new tab' ) }
								onChange={ ( value ) =>
									setAttributes( {
										linkTarget: value
											? '_blank'
											: '_self',
									} )
								}
								checked={ linkTarget === '_blank' }
							/>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Link rel' ) }
								value={ rel }
								onChange={ ( newRel ) =>
									setAttributes( { rel: newRel } )
								}
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<TagName {...blockProps}>
				{isLink ? (
					<a
						href={ link }
						target={ linkTarget }
						rel={ rel }
						onClick={ ( event ) => event.preventDefault() }
					>
					{ value }
					</a>
				) : (
					<>{ value }</>
				)}
				
			</TagName>
		</>
	)
}



export {Edit}
export default Edit
