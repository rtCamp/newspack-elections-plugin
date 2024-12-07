import {useSelect} from "@wordpress/data"
import {store as blockEditorStore} from "@wordpress/block-editor"

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

	const { clientId, attributes } = props

	// Once a Profile Has Inner Blocks we can't re-choose the variation
	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( blockEditorStore ).getBlocks( clientId ).length,
		[ clientId ]
	);

	// If we have a profileId then dont show the selector
	const hasSelectedProfile = attributes.profileId ?? false

	const showVariationSelector = !hasInnerBlocks;
	const showProfileSelector = !hasSelectedProfile;
	const showEdit = hasInnerBlocks && hasSelectedProfile;

	let Component
	if(showEdit){
		Component = ProfileBlockEdit
	} else if (showProfileSelector) {
		Component = ProfileSelector
	} else {
		Component = ProfileVariationSelector
	}


	return (
		<Component  {...props} />
	)
}