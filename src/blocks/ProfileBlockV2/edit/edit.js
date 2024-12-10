/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
	InspectorControls, useBlockProps, useInnerBlocksProps, InnerBlocks, BlockControls, store as blockEditorStore,
} from '@wordpress/block-editor';

import { useInstanceId } from '@wordpress/compose';
import { useRef, useEffect} from '@wordpress/element';
import { ToolbarGroup, Toolbar, Icon } from '@wordpress/components';

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

function ProfileBlockEdit( {attributes, setAttributes, isSelected: isSingleSelected, clientId,  ...props} ) {

    const ref = useRef(null);
	const instanceId = useInstanceId( ProfileBlockEdit );
	const blockProps = useBlockProps( { ref } );

	const { __unstableMarkNextChangeAsNotPersistent } = useDispatch( blockEditorStore );

	const {
		profileId = 0,
		queryId,
	} = attributes;

	const {profile, ...query} = useSelectProfile(profileId)

	const {children, ...innerBlockProps} = useInnerBlocksProps(blockProps, {
		template: DEFAULT_TEMPLATE,
		renderAppender : InnerBlocks.ButtonBlockAppender
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
						
					{ children }
				</>
			)}
		</>
	);
}

export default ProfileBlockEdit
export {ProfileBlockEdit}

