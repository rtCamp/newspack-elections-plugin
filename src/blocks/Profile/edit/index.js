import {useSelect} from "@wordpress/data"
import {store as blockEditorStore, useInnerBlocksProps, useBlockProps} from "@wordpress/block-editor"
import { store as blocksStore } from '@wordpress/blocks';

import { ProfileBlockEdit } from "./edit"
import { ProfileVariationSelector } from "./variation-selector"
import { ProfileSelector } from "./profile-selector"

import { ProfileSelector as ProfileSelectorPlaceholder } from "./../../../components/ProfileSelector.jsx"
import { PROFILE_POST_TYPE } from "@npe/editor"

import "./../editor.scss"
/**
 * The ProfileEdit Component's only job is to show the correct sub-component
 * 1. The Profile Selection UI
 * 2. The Pattern / Variation Picker UI
 * 3. The Block Editing UI
*/
export const ProfileEdit = ( props ) => {

	const { clientId, attributes, name, setAttributes, context} = props
	const blockProps = useBlockProps()
	const {children, ...innerBlockProps} = useInnerBlocksProps(blockProps)

	const isPreview = attributes.preview ?? true

	// Once a Profile Has Inner Blocks we can't re-choose the variation
	const hasInnerBlocks = useSelect( ( select ) => {
			return select( blockEditorStore ).getBlock( clientId )
		}, [ clientId ]
	);

	

	const hasVariations = useSelect( ( select ) => {
			return select( blocksStore ).getBlockVariations( name )
		}, [ name ]
	);
	
	const setProfile = (newProfileId) => {
		setAttributes({"postId" : newProfileId})
	}
	
	const hasContextQuery = (context.queryId && context.postId && (context.postType === PROFILE_POST_TYPE))
	
	// If we have a postId then dont show the selector
	const hasSelectedProfile = attributes.postId ?? hasContextQuery ?? false
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
		<Component  {...props} setProfile = {setProfile} />
	)
}