/**
 * External dependencies
 */
import clsx from 'clsx';
import {isEmpty} from "lodash"

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, useInnerBlocksProps, store as blockEditorStore} from "@wordpress/block-editor"

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
		['govpack/profile-label', {}],
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
	const { setFieldKey, fieldKey, fieldType, value, field, profile } =  useProfileFieldAttributes(props) 
	const fieldsofType = useFieldsOfType(props, fieldType)

	const hasValue = !isEmpty(value)
	/**
	 * Get Data From Parent Blocks
	 */
	const { 
		'govpack/showLabels' : ContextShowLabels = null, 
	} = context

	/**
	 * Get Data From This Blocks
	 */
	const { 
		label = null,
		showLabel,
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


	/*
	useEffect( () => {

		if(!contentBlock){
			return
		}

		updateBlock(contentBlock.clientId, {
			attributes : {
				...contentBlock.attributes,
				metadata : {
					bindings: {
						content: {
							...contentBlock.attributes.metadata.bindings.content,
							args : {
								key : meta_key,
								...contentBlock.attributes.metadata.bindings.content.args,
							}
						}
					}
				}
			}
		})

	}, [meta_key])
	*/

	/*
	useEffect( () => {
		if(!wasBlockJustInserted){
			return;
		}

		let insertAt = (currentBlockIndex + 1)
		let block = createBlock("govpack/profile-separator")
		insertBlock(block, insertAt, parentBlockClientId )

	}, [wasBlockJustInserted])
	*/
	

	const displayLabel = (label ? label : field?.label ?? "")

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

			{ children }
		</div>
	)
}

export {Edit}
export default Edit
