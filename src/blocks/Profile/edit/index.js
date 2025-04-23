import {useSelect} from "@wordpress/data"
import {store as blockEditorStore, useInnerBlocksProps, useBlockProps} from "@wordpress/block-editor"
import { store as blocksStore } from '@wordpress/blocks';
import { store as editorStore } from '@wordpress/editor';
import { useCallback } from '@wordpress/element';

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

	

	// Once a Profile Has Inner Blocks we can't re-choose the variation
	const hasInnerBlocks = useSelect( ( select ) => {
			return select( blockEditorStore ).getBlock( clientId )
		}, [ clientId ]
	);

	const {currentPostType, currentPostId} = useSelect( (select) => {
		return {
			currentPostType : select(editorStore).getCurrentPostType(),
			currentPostId: select(editorStore).getCurrentPostId()
		}
	}, [clientId])
	

	const hasVariations = useSelect( ( select ) => {
			return select( blocksStore ).getBlockVariations( name )
		}, [ name ]
	);
	
	const setProfile = useCallback ((newProfileId) => {
		setAttributes({"postId" : newProfileId})
	}, [setAttributes])
	
	const isProfilePage = (currentPostType === PROFILE_POST_TYPE) && (context.postId === currentPostId)
	const hasContextQuery = (context.queryId && context.postId && (context.postType === PROFILE_POST_TYPE))
	
	// If we have a postId then dont show the selector
	const hasSelectedProfile = attributes.postId ?? hasContextQuery ?? false
	const showVariationSelector = (hasInnerBlocks.length === 0) && (hasVariations.length > 0);
	const showProfileSelector = !isProfilePage && !hasSelectedProfile;
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
		<Component  {...props} setProfile = {setProfile} isProfilePage={isProfilePage} />
	)
}