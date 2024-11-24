/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InnerBlocks, store as blockEditorStore, InspectorControls, __experimentalSpacingSizesControl as SpacingSizesControl} from "@wordpress/block-editor"
import {useSelect} from "@wordpress/data";

import {
	Panel, PanelBody, PanelRow, ToggleControl,
	__experimentalToolsPanel as ToolsPanel, 
	__experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';

import {useState} from "@wordpress/element"

import "./edit.scss"
import DimensionInput from "./../../components/Controls/DimensionInput"
import { separator } from '@wordpress/icons';

function Edit( {attributes, setAttributes, context, clientId, ...props} ) {

	
	const {
		showSeparator = true,
		separatorHeight,
		separatorMargin
	} = attributes

	const { isBlockSelected, hasSelectedInnerBlock } = useSelect( (select) => {
		return {
			isBlockSelected : select(blockEditorStore).isBlockSelected(clientId),
			hasSelectedInnerBlock : select(blockEditorStore).hasSelectedInnerBlock(clientId),
		}
	});

	
	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps(blockProps, {
		renderAppender : (isBlockSelected || hasSelectedInnerBlock) ? InnerBlocks.ButtonBlockAppender : undefined
	});
	
	const units = [
		'%',
		'px',
		'em',
		'rem',
		'vw',
	];
	
	const [ margin, setMargin ] = useState();
	const [ height, setHeight ] = useState();

    return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody title={ __( 'Field Separators', 'govpack' ) }>
					<PanelRow>
						<ToggleControl 
							label = "Show Seperators Between Fields?"
							help = "Enable or Disable showing separator."
							checked = {showSeparator}
							onChange={ ( value ) => { setAttributes({"showSeparator" : value}) } }
							__nextHasNoMarginBottom
						/>
					</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>

			<InspectorControls group="styles">
				<ToolsPanel label={ __( 'Separator Dimensions', 'govpack' ) }>
					<ToolsPanelItem label="Margin" isShownByDefault={true}  hasValue={ () => !! separatorMargin }>
						<SpacingSizesControl
							values={ separatorMargin }
							onChange={ (nextMargin) => 
								setAttributes({ "separatorMargin" : nextMargin}) 
							}
							minimumCustomValue={ -Infinity }
							label={ __( 'Separator Margin' ) }
							sides={["vertical"]}
							units={ units }
							allowReset={ false }
							//onMouseOver={ onMouseOverMargin }
							//onMouseOut={ onMouseLeaveControls }
						/>
						 
					</ToolsPanelItem>

					<ToolsPanelItem isShownByDefault={true} label="Seperator"  hasValue={ () => !! separatorHeight }>
						<DimensionInput
							label={ __( 'Separator Height' ) }
							value={ separatorHeight }
							onChange={ ( nextHeight ) =>
								setAttributes( { separatorHeight: nextHeight } )
							}
						/>
					</ToolsPanelItem>

				</ToolsPanel>
			</InspectorControls>

			<div {...innerBlockProps} />
		</>
	)
}

export {Edit}
export default Edit
