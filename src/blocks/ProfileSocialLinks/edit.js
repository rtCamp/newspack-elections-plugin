import clsx from "clsx"

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InnerBlocks, store as blockEditorStore, InspectorControls, BlockControls } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data";

import { Panel, PanelBody, PanelRow, ToggleControl, ToolbarDropdownMenu, MenuGroup, MenuItem} from '@wordpress/components';

import {check} from "@wordpress/icons"

import "./edit.scss"

const sizeOptions = [
	{ name: __( 'Small' ), value: 'has-small-icon-size' },
	{ name: __( 'Normal' ), value: 'has-normal-icon-size' },
	{ name: __( 'Large' ), value: 'has-large-icon-size' },
	{ name: __( 'X Large' ), value: 'has-xlarge-icon-size' },
	{ name: __( 'XX Large' ), value: 'has-xxlarge-icon-size' },
];

const SocialPlaceholder = (
	<li className="wp-block-social-links__social-placeholder">
		<div className="wp-block-social-links__social-placeholder-icons">
			<div className="wp-social-link wp-social-link-twitter"></div>
			<div className="wp-social-link wp-social-link-facebook"></div>
			<div className="wp-social-link wp-social-link-instagram"></div>
		</div>
	</li>
);

const SocialLinksEdit = ( props) => {

	const {
		attributes, 
		setAttributes, 
		clientId 
	} = props

	const {
		iconBackgroundColorValue,
		customIconBackgroundColor,
		iconColorValue,
		openInNewTab,
		showLabels,
		size = 'has-normal-icon-size',
	} = attributes;

	const { isBlockSelected, hasSelectedInnerBlock } = useSelect( (select) => {
		return {
			isBlockSelected : select(blockEditorStore).isBlockSelected(clientId),
			hasSelectedInnerBlock : select(blockEditorStore).hasSelectedInnerBlock(clientId, true),
		}
	});

	const hasAnySelected = isBlockSelected || hasSelectedInnerBlock;

	

	// Fallback color values are used maintain selections in case switching
	// themes and named colors in palette do not match.
	const className = clsx( size, {
		'has-visible-labels': showLabels,
		//'has-icon-color': iconColor.color || iconColorValue,
		//'has-icon-background-color': iconBackgroundColor.color || iconBackgroundColorValue,
	} );
	
	const blockProps = useBlockProps( { className } );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		placeholder: ! isBlockSelected && SocialPlaceholder,
		templateLock: false,
		orientation: attributes.layout?.orientation ?? 'horizontal',
		__experimentalAppenderTagName: 'li',
		renderAppender: hasAnySelected && InnerBlocks.ButtonBlockAppender,
	} );

	const POPOVER_PROPS = {
		position: 'bottom right',
	};


    return (
		<>	

<BlockControls group="other">
				<ToolbarDropdownMenu
					label={ __( 'Size' ) }
					text={ __( 'Size' ) }
					icon={ null }
					popoverProps={ POPOVER_PROPS }
				>
					{ ( { onClose } ) => (
						<MenuGroup>
							{ sizeOptions.map( ( entry ) => {
								return (
									<MenuItem
										icon={
											( size === entry.value ||
												( ! size &&
													entry.value ===
														'has-normal-icon-size' ) ) &&
											check
										}
										isSelected={ size === entry.value }
										key={ entry.value }
										onClick={ () => {
											setAttributes( {
												size: entry.value,
											} );
										} }
										onClose={ onClose }
										role="menuitemradio"
									>
										{ entry.name }
									</MenuItem>
								);
							} ) }
						</MenuGroup>
					) }
				</ToolbarDropdownMenu>
			</BlockControls>

			<InspectorControls>
		
				<PanelBody title={ __( 'Settings' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Open links in new tab' ) }
						checked={ openInNewTab }
						onChange={ () =>
							setAttributes( { openInNewTab: ! openInNewTab } )
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Show text' ) }
						checked={ showLabels }
						onChange={ () =>
							setAttributes( { showLabels: ! showLabels } )
						}
					/>
				</PanelBody>
			</InspectorControls>


			

			<div {...innerBlocksProps} />
		</>
	)
}


export {SocialLinksEdit}
export default SocialLinksEdit
