/**
 * External dependencies
 */
import clsx from 'clsx';


/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, useInnerBlocksProps, store as blockEditorStore} from "@wordpress/block-editor"
import { store as editorStore } from "@wordpress/editor"
import { useSelect, useDispatch} from '@wordpress/data';
import {useEffect} from "@wordpress/element"
import { createBlock, store as blocksStore } from "@wordpress/blocks"


import {Panel, PanelBody, PanelRow, ToggleControl, SelectControl} from '@wordpress/components';
import {getProfile, useProfileField, useProfileFields, useProfileFromContext, useProfileData} from "./../../components/Profile"

import { ProfileFieldsInspectorControl } from '../../components/Controls/ProfileField';

const MetaInspectorControl = ({
	fieldKey,
	setAttributes,
	showLabel,
	hideFieldIfEmpty,
	fieldType = "text"
}) => {

	const blockProps = useBlockProps();
	
	const postType = useSelect( (select) => {
		return select(editorStore).getCurrentPostType()
	})



	const fields = useProfileFields(fieldType)


	return(
		<InspectorControls>
			<Panel>
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
			</Panel>
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
	

	//variation.innerBlocks ?? []
	/*
	return [
		...defaultTemplate,
		['core/paragraph', {
			"placeholder" : " ", // Include the space here or we get the default "start typing or select a block" when the meta data has no content
			"metadata": {
				"bindings":{
					"content":{
						"source":"core/post-meta",
						"args":{
							"key": "first_name"
						}
					}
				}
			}
		}]
	]
	*/
	return variation.innerBlocks ?? defaultTemplate 
}




function Edit( {attributes, setAttributes, context, clientId, ...props} ) {

	/**
	 * Get Data From Parent Blocks
	 */
	const { 
		'govpack/profileId' : profileId, 
		postType = false
	} = context

	/**
	 * Get Data From This Blocks
	 */
	const { 
		label = null,
		fieldKey = "",
		showLabel,
		hideFieldIfEmpty,
		fieldType = "text"
	} = attributes

	
	const {profile, fields} = useProfileData(context)
	const field = useProfileField(fieldKey)

	/**
	 * Get Data From The Editor
	 */
	const blockProps = useBlockProps();
	const {children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		template : useConditionalTemplate(clientId),
		renderAppender : false,
		templateLock: "all"
	} );

	// Select Block Store Data
	const {isBlockSelected, hasSelectedInnerBlock, contentBlock, wasBlockJustInserted, parentBlockClientId, currentBlock, currentBlockIndex } = useSelect( (select) => {
		return {
			isBlockSelected : select(blockEditorStore).isBlockSelected(clientId),
			hasSelectedInnerBlock : select(blockEditorStore).hasSelectedInnerBlock(clientId),
			currentBlock : select(blockEditorStore).getBlock(clientId),
			currentInnerBlocks : select(blockEditorStore).getBlock(clientId).innerBlocks,
			contentBlock : select(blockEditorStore).getBlock(clientId).innerBlocks.filter( (block) => block?.attributes?.metadata?.bindings !== undefined )[0],
			wasBlockJustInserted: select(blockEditorStore).wasBlockJustInserted(clientId) ?? false,
			parentBlockClientId: select(blockEditorStore).getBlockRootClientId(clientId),
			currentBlockIndex: select(blockEditorStore).getBlockIndex(clientId),
		}
	} )

	// Get classes as a variable so we can update it
	let {className} = innerBlocksProps
	
	/**
	 * Get methods to update data elsewhere 
	 */
	const { updateBlock, insertBlock } = useDispatch(blockEditorStore)

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
	
	


	const value = profile?.profile?.[fieldKey];
	const displayLabel = (label ? label : field?.label ?? "")

	
	// Should we output the UI to show that a field is hidden?
	// Add a class to the blockProps if so
	const shouldDimField = (hideFieldIfEmpty && value === "" && (!isBlockSelected) && (!hasSelectedInnerBlock) )
	className = clsx(className, {"gp-dim-field" : shouldDimField })

	const setFieldKey = (newKey) => {
		setAttributes({"fieldKey" : newKey})
	}


    return (
		<>
			<MetaInspectorControl
				fieldKey = {fieldKey}
				setAttributes = {setAttributes}
				showLabel = {showLabel}
				hideFieldIfEmpty = {hideFieldIfEmpty}
				fieldType = {fieldType}
			/>

			<ProfileFieldsInspectorControl
				fieldKey = {fieldKey}
				setFieldKey = {setFieldKey}
				fieldType = {fieldType}
				fields = { fields.filter( (f) => f.type === fieldType) }
			/>
			
			<div {...innerBlocksProps} className={className}>
				{ children }
			</div>
			
		</>
	)
}

export {Edit}
export default Edit
