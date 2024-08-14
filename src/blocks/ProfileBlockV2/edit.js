/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, useInnerBlocksProps,  InnerBlocks, BlockControls, store as blockEditorStore} from '@wordpress/block-editor';
import { useInstanceId } from '@wordpress/compose';
import { useRef, useEffect} from '@wordpress/element';
import { ResizableBox, ToolbarButton, ToolbarGroup, Toolbar, Icon } from '@wordpress/components';
import { addQueryArgs } from '@wordpress/url';

import { useSelect, useDispatch, select } from "@wordpress/data";
import { store as coreData } from "@wordpress/core-data"

import { external, postAuthor } from '@wordpress/icons';

import ProfileDisplaySettings from '../../components/Panels/ProfileDisplaySettings.jsx'
import ProfileAvatarPanel from '../../components/Panels/ProfileAvatarPanel';
import ProfileCommsPanel from '../../components/Panels/ProfileCommsPanel'
import ProfileCommsOtherPanel from '../../components/Panels/ProfileCommsOtherPanel'
import ProfileCommsSocialPanel from '../../components/Panels/ProfileCommsSocialPanel'
import {ProfileLinksPanel} from '../../components/Panels/ProfileLinksPanel.jsx'
import AvatarAlignmentToolBar from '../../components/Toolbars/AvatarAlignment.jsx';
import BlockSizeAlignmentToolbar from '../../components/Toolbars/BlockSizeAlignmentToolbar.jsx';
import ResetProfileToolbar from '../../components/Toolbars/ResetProfileToolbar.jsx';
import {ProfileResetPanel} from '../../components/Panels/ProfileResetPanel.jsx';

import SingleProfile from "./../../components/single-profile"

import { Spinner } from './../../components/Spinner.jsx';
import { ProfileSelector } from "./../../components/ProfileSelector.jsx"
import { useSelectProfile } from "./../../components/SelectProfile.jsx"


const TEMPLATE = [
	[ "core/post-featured-image", {}, []],
	[ "core/post-title", {}, []],
	[ "core/post-excerpt", {
		"moreText" : " ",
		"showMoreOnNewLine": false
	}, []]
]


const usePostEditURL = ( postId ) => {

	if ( ! postId ) {
		return null;
	}

	const editURL = addQueryArgs( 'post.php' , {
		post: postId,
		action: 'edit',
	} );

	return editURL;
};


const ProfileBlockControls = ({ attributes, setAttributes, ...props}) => {
	const postEditURL = usePostEditURL(attributes.profileId)

	return (
		<BlockControls>
			<ToolbarGroup>
				
				<Toolbar
                	controls={ [
                    	{
                        	icon: <Icon icon={ postAuthor } />,
                        	title: __( 'Modify Selection', 'govpack' ),
                        	onClick: () => {
                            	props.setProfile( null );
                        	},
                    	},
						{
                        	icon: <Icon icon={ external } />,
                        	title: __( 'Edit Profile', 'govpack' ),
                        	href : postEditURL,
							target: "_blank"
                    	},
                	] }
            	/>
			</ToolbarGroup>
		</BlockControls>
	)
}

function Edit( {attributes, setAttributes, isSelected: isSingleSelected, ...props} ) {

    const ref = useRef(null);
	const instanceId = useInstanceId( Edit );
	const blockProps = useBlockProps( { ref } );

	const { __unstableMarkNextChangeAsNotPersistent } = useDispatch( blockEditorStore );

	const currentWidth = ref.current?.offsetWidth
	const {
		profileId = 0,
		queryId,
        showAvatar
	} = attributes;

	const {profile, ...query} = useSelectProfile(profileId)

	const {children, ...innerBlockProps} = useInnerBlocksProps(blockProps, {
		template: TEMPLATE,
		orientation: "vertical",
		renderAppender : InnerBlocks.DefaultBlockAppender

	})

	const showResizeHandle = ((isSingleSelected) && (['left', 'right', 'center'].includes(attributes.align)))

	useEffect( () => {
		if ( ! Number.isFinite( queryId ) ) {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes( { queryId: instanceId } );
		}
	}, [ queryId, instanceId ] );

	const resetProfile = () => {
		setProfile( 0 )
	}
	const setProfile = (newProfileId = 0) => {

		if(newProfileId === null){
			newProfileId = 0
		}
		setAttributes({"profileId" : newProfileId})
	}

	useEffect( () => {
		console.log("useEffect", profile, attributes)

		if(!profile){
			return
		}

		if(!profile?.meta?.name){
			return
		}

		setAttributes({"metadata" : {
			...attributes.metadata,
			name: `Govpack Profile : ${profile.meta.name}`
		}})

	}, [profile])

	const showSelector = (profileId === 0)
	const showSpinner = ((query.hasStartedResolution) && (!query.hasFinishedResolution) && (showSelector === false))
	const showProfile = ((query.hasFinishedResolution) && (profile))
	
	console.log("allowedBlocks", select(blockEditorStore).getAllowedBlocks(props.clientId))
	return (
		<div { ...blockProps }>

			{ showSelector && (
				<ProfileSelector setProfile = {setProfile} />
			) }

			{ showSpinner && (
				<Spinner />
			) }
			
			{ showProfile && (
				<>
					<ProfileBlockControls 
						attributes = {attributes} 
						setAttributes = {setAttributes} 
						setProfile = {setProfile}
					/>
					<InspectorControls>
						<ProfileResetPanel profileId = {profileId} setProfile = {resetProfile}  />
					</InspectorControls>
						<div {...innerBlockProps}>
						{/* 
						<ResizableBox
							enable={ {
								top: false,
								right: true,
								bottom: false,
								left: false,
							} }
							showHandle={ showResizeHandle }
							style={ {
								display: 'block'
							} }
							size={ {
								width: currentWidth + "px" ?? 'auto',
								height: 'auto',
							} }
							onResizeStop={ ( event, direction, elt ) => {
								setAttributes( {
									width: `${ elt.offsetWidth }px`,
								} );
							} }
						>						
						*/}
						{ children }
						{/** 
					</ResizableBox>
							*/}
					</div>
				</>
			)}
		</div>
	);
}

export {Edit}
export default Edit
