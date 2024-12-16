/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */

import { __, _x, isRTL } from '@wordpress/i18n';
import { 
	InspectorControls, useBlockProps, useInnerBlocksProps, InnerBlocks, BlockControls, store as blockEditorStore,
	__experimentalUseBorderProps as useBorderProps,
	__experimentalUseColorProps as useColorProps,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
	useBlockEditContext
} from '@wordpress/block-editor';

import {select} from "@wordpress/data"

import { useInstanceId } from '@wordpress/compose';
import { useRef, useEffect} from '@wordpress/element';
import { ToolbarGroup, Toolbar, Icon, ResizableBox } from '@wordpress/components';

import { addQueryArgs } from '@wordpress/url';
import { useDispatch, useSelect } from "@wordpress/data";
import { external, postAuthor } from '@wordpress/icons';

import { ProfileResetPanel } from '../../../components/Panels/ProfileResetPanel.jsx';
import { Spinner } from './../../../components/Spinner.jsx';
import { useSelectProfile } from "./../../../components/SelectProfile.jsx"



import { DEFAULT_TEMPLATE } from './default-template.js';


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

const useResizeProps = (props ) => {
	const { toggleSelection } = useDispatch( blockEditorStore );

	const {
		attributes, 
		setAttributes, 
		isSelected: isSingleSelected
	} = props
	
	const {
		align,
		customWidth
	} = attributes

	const isResizeEnabled = () => {
		return (align === "left" ) || ( align === "right" ) || ( align === "center" )
	}

	const resizeEnabled = isResizeEnabled()
	const numericWidth = customWidth ? parseInt( customWidth, 10 ) : "250";
	const currentWidth = resizeEnabled ? numericWidth : "100%"
	const enableHandles = resizeEnabled && isSingleSelected

	let showRightHandle = false;
	let showLeftHandle = false;

	const onResizeStart = () => {
		toggleSelection( false );
	}

	const onResizeStop = () => {
		toggleSelection( true );
	}

	if ( align === 'center' ) {
		// When the image is centered, show both handles.
		showRightHandle = true;
		showLeftHandle = true;
	} else if ( isRTL() ) {
		if ( align === 'left' ) {
			showRightHandle = true;
		} else {
			showLeftHandle = true;
		}
	} else {
		if ( align === 'right' ) {
			showLeftHandle = true;
		} else {
			showRightHandle = true;
		}
	}

	//const maxWidthBuffer = maxWidth * 2.5;
	//const maxResizeWidth = maxContentWidth || maxWidthBuffer;

	return {
		size : {
			width: currentWidth ?? 'auto'
		},
		//maxWidth : maxResizeWidth,
		onResizeStart : onResizeStart,
		onResizeStop : ( event, direction, elt ) => {
			onResizeStop()
			setAttributes({"customWidth":`${ elt.offsetWidth }px`})
		},
		showHandle: enableHandles,
		enable : {
			top: false,
			right: showRightHandle,
			bottom: false,
			left: showLeftHandle,
		},
		resizeRatio : (align === 'center' ? 2 : 1 )
	}
}

const ProfileWrapper = ({children, attributes}) => {

	const borderProps = useBorderProps( attributes );
	const spacingStyles = getSpacingClassesAndStyles(attributes)
	const colorProps = useColorProps(attributes)


	const wrapperProps = {
		className : clsx("profile-inner", borderProps.className,  colorProps.className),
		style: {
			...spacingStyles.style,
			...borderProps.style,
			...colorProps.style,
		}
	}
	return (<div {...wrapperProps}>
		{ children }
	</div>
	)
}


const useProfileId = (props) => {

	const { context } = props

	const { 
		postType = null
	} = context

	// Get the profileId from context, falling back to attributes then null if needed.
	// do the same with postId

	const [profileId, isProfileControlledByContext, isProfileControlledByAttr] = useContextOverAttribute(props, "govpack/profileId", "profileId")
	const [postId, isPostControlledByContext, isPostControlledByAttr] = useContextOverAttribute(props, "postId", "postId")
	

	// postId will be invalid for a profile unless the postType is profiles
	const canUsePostID = (postType === "govpack_profiles")

	// set the value to the profileId, falling back to the postId if postid can be used
	const value = profileId ?? (canUsePostID ? postId : null)
	
	const isControlledByContext = isProfileControlledByContext ?? (canUsePostID ? isPostControlledByContext : null)
	const isControlledByAttribute = isProfileControlledByAttr ?? (canUsePostID ? isPostControlledByAttr : null)

	return {
		profileId : value,
		isControlledByAttribute,
		isControlledByContext
	}
}

const useContextOverAttribute = (props, contextKey = null, attributeKey = null, defaultValue = null) => {
	
	const {attributes, context} = props

	const attrValue = attributes?.[attributeKey] ?? null
	const contextValue = attributes?.[contextKey] ?? null

	const value = contextValue ?? attrValue ?? defaultValue ?? null
	const isControlledByContext = (contextValue !== null)
	const isControlledByAttribute = ((isControlledByContext === false) && (attrValue !== null))

	return [value, isControlledByContext, isControlledByAttribute]
}

const useProfileAttributes = ( props ) => {

	const { setAttributes, attributes } = props

	const resetProfile = () => {
		setProfile( 0 )
	}

	const setProfile = (newProfileId = 0) => {

		if(newProfileId === null){
			newProfileId = 0
		}
		setAttributes({"profileId" : newProfileId})
	}

	const profileId = useProfileId(props)?.profileId

	const {profile, ...profileQuery} = useSelectProfile(profileId)

	
	return {setProfile, resetProfile, profileId, profile, profileQuery}
}

function ProfileBlockEdit( props ) {

	const {attributes, setAttributes, isSelected: isSingleSelected, clientId, context} = props
	const resizeProps = useResizeProps(props);
	const {setProfile, resetProfile, profileId, profile, profileQuery} = useProfileAttributes(props)
    const ref = useRef(null);
	const instanceId = useInstanceId( ProfileBlockEdit );
	const blockProps = useBlockProps( { ref } );

	const { __unstableMarkNextChangeAsNotPersistent } = useDispatch( blockEditorStore );

	const {
		queryId,
	} = attributes;


	const innerBlockProps = useInnerBlocksProps(blockProps, {
		template: DEFAULT_TEMPLATE,
	})

	const allowedBlocks = useSelect( (select) => {
		return select(blockEditorStore).getAllowedBlocks(clientId)
	}, [clientId] )


	

	useEffect( () => {
		if ( ! Number.isFinite( queryId ) ) {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes( { queryId: instanceId } );
		}
	}, [ queryId, instanceId ] );

	

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
	const showSpinner = ((profileQuery.hasStartedResolution) && (!profileQuery.hasFinishedResolution) && (showSelector === false))
	const showProfile = ((profileQuery.hasFinishedResolution) && (profile))


	
	
	
	return (
		<>

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
					

					<div {...blockProps}>
					<ResizableBox {...resizeProps} >
						<ProfileWrapper {...props}>
							<InnerBlocks {...props}/>
						</ProfileWrapper>
					</ResizableBox>
					</div>
				</>
			)}
		</>
	);
}

export default ProfileBlockEdit
export {ProfileBlockEdit}

