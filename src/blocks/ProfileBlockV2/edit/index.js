import {useSelect} from "@wordpress/data"
import {store as blockEditorStore, useInnerBlocksProps, useBlockProps} from "@wordpress/block-editor"
import { store as blocksStore } from '@wordpress/blocks';

import { ProfileBlockEdit } from "./edit"
import { ProfileVariationSelector } from "./variation-selector"
import { ProfileSelector } from "./profile-selector"

import { ProfileSelector as ProfileSelectorPlaceholder } from "./../../../components/ProfileSelector.jsx"

/**
 * The ProfileEdit Component's only job is to show the correct sub-component
 * 1. The Profile Selection UI
 * 2. The Pattern / Variation Picker UI
 * 3. The Block Editing UI
*/
export const ProfileEdit = ( props ) => {

	const { clientId, attributes, name, setAttributes } = props
	const blockProps = useBlockProps()
	const innerBlockProps = useInnerBlocksProps(blockProps)
	const isPreview = attributes.preview ?? true


	// Once a Profile Has Inner Blocks we can't re-choose the variation
	const hasInnerBlocks = useSelect( ( select ) => {
			return{
				hasInnerBlocks : select( blockEditorStore ).getBlocks( clientId ),
			}
		}, [ clientId ]
	);

	const hasVariations = useSelect( ( select ) => {
			return{
				hasVariations : select( blocksStore ).getBlockVariations( name ) ,
			}
		}, [ name ]
	);
	
	const setProfile = (newProfileId) => {
		setAttributes({"profileId" : newProfileId})
	}
	
	
	// If we have a profileId then dont show the selector
	const hasSelectedProfile = attributes.profileId ?? false
	const showVariationSelector = (hasInnerBlocks.length === 0) && (hasVariations.length > 0);
	const showProfileSelector = !hasSelectedProfile;
	const showEdit = hasInnerBlocks && hasSelectedProfile;

	
	let Component
	if(showProfileSelector){
		Component = ProfileSelectorPlaceholder
	} else if (showVariationSelector) {
		Component = ProfileVariationSelector
	} else {
		Component = ProfileBlockEdit
	}
	
	return (
		
		<div {...innerBlockProps}>
			<Component  {...props} setProfile = {setProfile} />
		</div>
	)
}