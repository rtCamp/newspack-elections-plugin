import {useSelect} from "@wordpress/data"
import {store as blockEditorStore} from "@wordpress/block-editor"
import { store as blocksStore } from '@wordpress/blocks';

import { ProfileBlockEdit } from "./edit"
import { ProfileVariationSelector } from "./variation-selector"
import { ProfileSelector } from "./profile-selector"

/**
 * The ProfileEdit Component's only job is to show the correct sub-component
 * 1. The Profile Selection UI
 * 2. The Pattern / Variation Picker UI
 * 3. The Block Editing UI
*/
export const ProfileEdit = ( props ) => {

	const { clientId, attributes, name } = props
	

	// Once a Profile Has Inner Blocks we can't re-choose the variation
	const { hasInnerBlocks, hasVariations } = useSelect( ( select ) => ({
			hasInnerBlocks : select( blockEditorStore ).getBlocks( clientId ).length,
			hasVariations : select( blocksStore ).getBlockVariations( name ).length ,
		}),
		[ clientId, name ]
	);

	
	// If we have a profileId then dont show the selector
	const hasSelectedProfile = attributes.profileId ?? false

	const showVariationSelector = !hasInnerBlocks && hasVariations;
	const showProfileSelector = !hasSelectedProfile;
	const showEdit = hasInnerBlocks && hasSelectedProfile;

	let Component
	if(showProfileSelector){
		Component = ProfileSelector
	} else if (showVariationSelector) {
		Component = ProfileVariationSelector
	} else {
		Component = ProfileBlockEdit
	}


	return (
		<Component  {...props} />
	)
}