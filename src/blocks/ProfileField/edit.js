/**
 * External dependencies
 */
import clsx from 'clsx';


/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, useInnerBlocksProps, store as blockEditorStore} from "@wordpress/block-editor"
import { store as editorStore } from "@wordpress/editor"
import { store as coreDataStore, useEntityRecord} from '@wordpress/core-data';
import { useSelect, useDispatch} from '@wordpress/data';
import {useEffect} from "@wordpress/element"

import { decodeEntities } from '@wordpress/html-entities';

import {Panel, PanelBody, PanelRow, ToggleControl, BaseControl, ButtonGroup, Button, Spinner,SelectControl} from '@wordpress/components';


const useProfile = () => {
	return useSelect( (select) => {
		return select(editorStore).getCurrentPost()
	})
}

export const useProfileFields = () => {
	const fields = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'govpack', 'fields', { per_page: '-1' } ) ?? [];
	} );

	return fields ;
};


const MetaInspectorControl = ({
	meta,
	setAttributes,
	showLabel,
	hideFieldIfEmpty
}) => {

	const blockProps = useBlockProps();
	
	const postType = useSelect( (select) => {
		return select(editorStore).getCurrentPostType()
	})


	const fields = useProfileFields()

	return(
		<InspectorControls>
			<Panel>
				<PanelBody title={ __( 'Profile Field', 'govpack' ) }>
					<PanelRow>
						<SelectControl 
							label = "Field Value"
							help = "Select a piece of profile data to display."
							value={ meta } // e.g: value = 'a'
							onChange={ ( selection ) => { setAttributes({"meta_key" : selection}) } }
							options = {fields.map( ( field ) => {
								return {
									"value" : field.slug,
									"label" : field.label
								}
							})}
							__nextHasNoMarginBottom
						/>
					</PanelRow>
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
		meta_key = "",
		showLabel,
		hideFieldIfEmpty
	} = attributes

	/**
	 * Get Data From The Editor
	 */
	const blockProps = useBlockProps();
	const {children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		template : [
			['govpack/profile-label', {}],
			['core/paragraph', {
				"placeholder" : " ",
				"metadata": {
					"bindings":{
						"content":{
							"source":"core/post-meta",
							"args":{
								"key": meta_key
							}
						}
					}
				}
			}]
		],
		renderAppender : false,
		templateLock: "all"
	} );

	// Select Block Store Data
	const {isBlockSelected, hasSelectedInnerBlock, contentBlock } = useSelect( (select) => {
		return {
			isBlockSelected : select(blockEditorStore).isBlockSelected(clientId),
			hasSelectedInnerBlock : select(blockEditorStore).hasSelectedInnerBlock(clientId),
			currentBlock : select(blockEditorStore).getBlock(clientId),
			currentInnerBlocks : select(blockEditorStore).getBlock(clientId).innerBlocks,
			contentBlock : select(blockEditorStore).getBlock(clientId).innerBlocks.filter( (block) => block?.attributes?.metadata?.bindings !== undefined )[0]
		
		}
	} )

	// Get classes as a variable so we can update it
	let {className} = innerBlocksProps
	
	/**
	 * Get methods to update data elsewhere 
	 */
	const {updateBlock} = useDispatch(blockEditorStore)

	useEffect( () => {

		if(!contentBlock){
			return
		}

		console.log("contentBlock", contentBlock)
		updateBlock(contentBlock.clientId, {
			attributes : {
				...contentBlock.attributes,
				metadata : {
					bindings: {
						content: {
							...contentBlock.attributes.metadata.bindings.content,
							args : {
								key : meta_key
							}
						}
					}
				}
			}
		})

	}, [meta_key])

	const profile = useEntityRecord("postType", "govpack_profiles", profileId).record

	const fields = useProfileFields()
	const field = fields.filter( (field) => {
		return field.slug === meta_key
	})[0];


	const value = profile?.meta[meta_key];
	const displayLabel = (label ? label : field?.label ?? "")

	
	// Should we output the UI to show that a field is hidden?
	// Add a class to the blockProps if so
	const shouldDimField = (hideFieldIfEmpty && value === "" && (!isBlockSelected) && (!hasSelectedInnerBlock) )
	className = clsx(className, {"gp-dim-field" : shouldDimField })

	console.log("contentBlock", contentBlock)

    return (
		<>
			<MetaInspectorControl
				meta = {meta_key}
				setAttributes = {setAttributes}
				showLabel = {showLabel}
				hideFieldIfEmpty = {hideFieldIfEmpty}
			/>

			
			<div {...innerBlocksProps} className={className}>
				{ children }
			</div>
			
		</>
	)
}

export {Edit}
export default Edit
