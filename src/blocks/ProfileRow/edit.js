/**
 * External dependencies
 */
import clsx from 'clsx';
import {isEmpty} from "lodash"

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, useInnerBlocksProps, store as blockEditorStore, RichText} from "@wordpress/block-editor"

import { useSelect} from '@wordpress/data';
import { store as blocksStore } from "@wordpress/blocks"


import {Panel, PanelBody, PanelRow, ToggleControl} from '@wordpress/components';
import {useProfileFieldAttributes, useFieldsOfType} from "./../../components/Profile"



const MetaInspectorControl = ({
	fieldKey,
	setAttributes,
	showLabel,
	hideFieldIfEmpty,
	fieldType = "text"
}) => {

	return(
		<InspectorControls>
			
				<PanelBody title={ __( 'Profile Label Controls', 'govpack' ) }>
					<PanelRow>
						<ToggleControl 
							label = "Show the field label?"
							help = "Enable or Disable showing the a descriptive label for the field."
							checked = {showLabel}
							onChange={ ( value ) => { setAttributes({"showLabel" : value}) } }
							__nextHasNoMarginBottom
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl 
							label = "Hide field if empty?"
							help = "Hide the field if the profile is missing this field, or leave it empty on screen."
							checked = {hideFieldIfEmpty}
							onChange={ ( value ) => { setAttributes({"hideFieldIfEmpty" : value}) } }
							__nextHasNoMarginBottom
						/>
					</PanelRow>
				</PanelBody>
			
		</InspectorControls>
	)
}


function useConditionalTemplate(clientId){

	const defaultTemplate = [
		['core/paragraph', {
			"placeholder" : "Profile Value..."
		}]
	]

	const { block, variation } = useSelect( (select) => {
		const block = select(blockEditorStore).getBlock(clientId)
		return {
			block,
			variation: select(blocksStore).getActiveBlockVariation(block.name, block.attributes),
		}
	} )
	

	return variation?.innerBlocks ?? defaultTemplate 
}

function Edit( props ) {


	const {attributes, setAttributes, context, clientId} = props  
	const blockProps = useBlockProps();
	const { fieldKey, fieldType, value, field } =  useProfileFieldAttributes(props) 
	const hasValue = !isEmpty(value)

	/**
	 * Get Data From Parent Blocks
	 */
	const { 
		'govpack/showLabels' : GroupShowLabels = null, 
	} = context

	/**
	 * Get Data From This Blocks
	 */
	const { 
		label = null,
		showLabel : RowShowLabel,
		hideFieldIfEmpty,
	} = attributes

	/**
	 * Get Data From The Editor
	 */

	const {children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		template : useConditionalTemplate(clientId),
		renderAppender : false,
		templateLock: "all"
	} );

	let {className} = innerBlocksProps

	// Select Block Store Data
	const {isBlockSelected, hasSelectedInnerBlock} = useSelect( (select) => {
		return {
			isBlockSelected : select(blockEditorStore).isBlockSelected(clientId),
			hasSelectedInnerBlock : select(blockEditorStore).hasSelectedInnerBlock(clientId),
			//currentBlock : select(blockEditorStore).getBlock(clientId),
			//currentInnerBlocks : select(blockEditorStore).getBlock(clientId).innerBlocks,
			//contentBlock : select(blockEditorStore).getBlock(clientId).innerBlocks.filter( (block) => block?.attributes?.metadata?.bindings !== undefined )[0],
			//wasBlockJustInserted: select(blockEditorStore).wasBlockJustInserted(clientId) ?? false,
			//parentBlockClientId: select(blockEditorStore).getBlockRootClientId(clientId),
			//currentBlockIndex: select(blockEditorStore).getBlockIndex(clientId),
		}
	} )

	const updateLabel = (label) => {
		setAttributes({
			label
		})
	}

	
	let calculatedLabel;
	if(!label && field){
		calculatedLabel = field?.label ?? "";
	} else {
		calculatedLabel = label;
	}

	const showLabel = (RowShowLabel !== null) ? RowShowLabel : GroupShowLabels ?? true

	// Should we output the UI to show that a field is hidden?
	// Add a class to the blockProps if so
	const shouldDimField = (hideFieldIfEmpty && (!hasValue) && (!isBlockSelected) && (!hasSelectedInnerBlock) )
	className = clsx(className, {"gp-dim-field" : shouldDimField })

    return (
		<div {...innerBlocksProps} className={className}>
			<MetaInspectorControl
				fieldKey = {fieldKey}
				setAttributes = {setAttributes}
				showLabel = {showLabel ?? false}
				hideFieldIfEmpty = {hideFieldIfEmpty}
				fieldType = {fieldType}
			/>

			{showLabel && (
				<div className="gp-block-row-label">
					<RichText
						tagName="span" // The tag here is the element output and editable in the admin
						value={ calculatedLabel } // Any existing content, either from the database or an attribute default
						allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
						onChange={ ( label ) => updateLabel( label ) } // Store updated content as a block attribute
						placeholder={ __( 'Label...' ) } // Display this text before any content has been added by the user
					/>
				</div>
			)}

			{ children }
		</div>
	)
}

export {Edit}
export default Edit
