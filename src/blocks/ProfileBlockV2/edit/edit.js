/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
	InspectorControls, useBlockProps, useInnerBlocksProps,  InnerBlocks, BlockControls, store as blockEditorStore,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients, withColors, useSettings
} from '@wordpress/block-editor';
import { useInstanceId } from '@wordpress/compose';
import { useRef, useEffect} from '@wordpress/element';
import { ResizableBox, ToolbarButton, ToolbarGroup, Toolbar, Icon } from '@wordpress/components';
import { addQueryArgs } from '@wordpress/url';

import { useDispatch } from "@wordpress/data";

import { external, postAuthor } from '@wordpress/icons';
import {ProfileResetPanel} from '../../../components/Panels/ProfileResetPanel.jsx';


import { Spinner } from './../../../components/Spinner.jsx';
import { ProfileSelector } from "./../../../components/ProfileSelector.jsx"
import { useSelectProfile } from "./../../../components/SelectProfile.jsx"

import { addFilter } from '@wordpress/hooks';

const TEMPLATE = [
	[ "core/post-featured-image", {}, []],
	[ "core/post-title", {}, []],
	[ "core/post-excerpt", {
		"moreText" : " ",
		"showMoreOnNewLine": false
	}, []]
]




/*
addFilter(
	'blockEditor.useSetting.before',
	'govpack/useSetting.before',
	( settingValue, settingName, clientId, blockName ) => {
		if(blockName !== "govpack/profile-v2"){
			return settingValue;
		}
		console.log(settingName, settingValue)
		return settingValue;
	}
);

*/

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

function ProfileBlockEdit( {attributes, setAttributes, isSelected: isSingleSelected, ...props} ) {

    const ref = useRef(null);
	const instanceId = useInstanceId( ProfileBlockEdit );
	const blockProps = useBlockProps( { ref } );

	//console.log(useSettings("madeup.setting.path"))
	//console.log("getting all pallete", useSettings("color.palette"))
	const { __unstableMarkNextChangeAsNotPersistent } = useDispatch( blockEditorStore );

	/*
	let colorGradientSettings = useMultipleOriginColorsAndGradients();
	colorGradientSettings.colors = [
		...colorGradientSettings.colors,
		...[
			{
				"name" : "Elections",
				"colors" : [
					{
						"color": "#ff0000",
						"slug": "election-1",
						"label": "Election Red"
					},
					{
						"color": "#0000ff",
						"slug": "election-2",
						"label": "Election Blue"
					}
				]
			}
		]
	]
	*/

	//console.log(colorGradientSettings);

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
		

		if(!profile){
			return
		}

		if(!profile?.meta?.name){
			return
		}

		//setAttributes({"metadata" : {
		//	...attributes.metadata,
		//	name: `Govpack Profile : ${profile.meta.name}`
		//}})

	}, [profile])

	const showSelector = (profileId === 0)
	const showSpinner = ((query.hasStartedResolution) && (!query.hasFinishedResolution) && (showSelector === false))
	const showProfile = ((query.hasFinishedResolution) && (profile))

	return (
		<div { ...innerBlockProps }>

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
					
				</>
			)}
		</div>
	);
}

export default ProfileBlockEdit
export {ProfileBlockEdit}

