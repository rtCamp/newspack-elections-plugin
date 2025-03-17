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
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles
} from '@wordpress/block-editor';
import { useInstanceId } from '@wordpress/compose';
import { useRef, useEffect} from '@wordpress/element';
import { ToolbarGroup, Toolbar, Icon, ResizableBox, SelectControl } from '@wordpress/components';
import { useDispatch, useSelect} from "@wordpress/data";
import { external, postAuthor } from '@wordpress/icons';


import { ProfileResetPanel } from '../../../components/Panels/ProfileResetPanel.jsx';
import { Spinner } from './../../../components/Spinner.jsx';

import { DEFAULT_TEMPLATE } from './default-template.js';

import { useProfileAttributes } from '../../../profile';
import { usePostEditURL } from '../../../components/post-edit-url';



const ProfileBlockControls = ({ attributes, setAttributes, ...props}) => {
	const postEditURL = usePostEditURL(attributes.postId)

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

const ProfileWrapper = ({children, attributes, __unstableLayoutClassNames = ""}) => {

	const borderProps = useBorderProps( attributes );

	const { style  = {} } = attributes
	const { spacing = {} } = style
	const { padding : paddingAttributes = {} } = spacing

	const spacingStyles = getSpacingClassesAndStyles({style:{spacing:{padding:paddingAttributes}}})
	const colorProps = useColorProps(attributes)


	const wrapperProps = {
		className : clsx("profile-inner", borderProps.className,  colorProps.className, __unstableLayoutClassNames),
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


const BlockHTMLElementControl = (props) => {	

	const {
		tagName,
		onSelectTagName
	} = props

	const htmlElementMessages = {
		
		main: __(
			'The <main> element should be used for the primary content of your document only.'
		),
		section: __(
			"The <section> element should represent a standalone portion of the document that can't be better represented by another element."
		),
		article: __(
			'The <article> element should represent a self-contained, syndicatable portion of the document.'
		),
		aside: __(
			"The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."
		)
		
	};

	return (
		<InspectorControls group="advanced">
			<SelectControl
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				label={ __( 'HTML element' ) }
				options={ [
					{ label: __( 'Default (<div>)' ), value: 'div' },
					{ label: '<main>', value: 'main' },
					{ label: '<section>', value: 'section' },
					{ label: '<article>', value: 'article' },
					{ label: '<aside>', value: 'aside' },
				] }
				value={ tagName }
				onChange={ onSelectTagName }
				help={ htmlElementMessages[ tagName ] }
			/>
		</InspectorControls>
	)
}

function ProfileBlockEdit( props ) {
	const {attributes, setAttributes, isSelected: isSingleSelected, clientId, context} = props

	
	const resizeProps = useResizeProps(props);
	const {setProfile, resetProfile, profileId = null, profile, profileQuery} = useProfileAttributes(props)

	const { isBlockSelected, hasSelectedInnerBlock, selectedInnerBlock, selectedInnerBlockParentsOfType, isSelectedBlockProfileGroup } = useSelect( (select) => {
		const isBlockSelected = select(blockEditorStore).isBlockSelected(clientId)
		const hasSelectedInnerBlock = select(blockEditorStore).hasSelectedInnerBlock(clientId, true)
		const selectedInnerBlock = hasSelectedInnerBlock ? select(blockEditorStore).getSelectedBlock() : null
		const isSelectedBlockProfileGroup = (selectedInnerBlock?.name === "govpack/profile-row-group")
		const selectedInnerBlockParentsOfType = selectedInnerBlock ?  select(blockEditorStore).getBlockParentsByBlockName(selectedInnerBlock?.clientId, "govpack/profile-row-group" ) : []
		//const showAppender = (isBlockSelected || (hasSelectedInnerBlock && !isSelectedBlockProfileGroup))
		return {
			isBlockSelected,
			hasSelectedInnerBlock,
			selectedInnerBlock,
			isSelectedBlockProfileGroup,
			selectedInnerBlockParentsOfType,
		}
	});


	const showAppender = (isBlockSelected || (hasSelectedInnerBlock && !isSelectedBlockProfileGroup && selectedInnerBlockParentsOfType.length === 0))
    const ref = useRef(null);
	const instanceId = useInstanceId( ProfileBlockEdit );
	const blockProps = useBlockProps( { ref } );
	const {children, ...innerBlockProps} = useInnerBlocksProps(blockProps, {
		template : DEFAULT_TEMPLATE,
		renderAppender : (showAppender) ? InnerBlocks.ButtonBlockAppender : false
	})

	

	const { __unstableMarkNextChangeAsNotPersistent } = useDispatch( blockEditorStore );

	const {
		queryId,	
		tagName : TagName = 'div',
	} = attributes;

	const {
		postId = null
	} = context;


	useEffect( () => {
		if ( ! Number.isFinite( queryId ) ) {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes( { queryId: instanceId } );
		}
	}, [ queryId, instanceId ] );


	const setTagName = ( nextTagValue ) => {
		setAttributes( { tagName: nextTagValue } )
	}

	useEffect( () => {
		
		if(!profile){
			return
		}

		if(!profile?.meta?.name){
			return
		}

		setAttributes({"metadata" : {
			...attributes.metadata,
			name: `Profile : ${profile.meta.name}`
		}})

	}, [profile])


	const showSpinner = profileQuery.isLoading
	const showProfile = profileQuery.hasLoaded === true



	return (
		<>

			{ showSpinner && (
				<Spinner />
			) }
			
			{ showProfile && (
				<TagName {...innerBlockProps}>
					
					<ProfileBlockControls 
						attributes = {attributes} 
						setAttributes = {setAttributes} 
						setProfile = {setProfile}
					/>
					
					<InspectorControls>
						<ProfileResetPanel profileId = {profileId} setProfile = {resetProfile}  />
					</InspectorControls>
					
					<BlockHTMLElementControl
						tagName = {TagName}
						onSelectTagName = {setTagName}
					/>

					
					<ResizableBox {...resizeProps} >
						<ProfileWrapper {...props}>
							{ children }
						</ProfileWrapper>
					</ResizableBox>
				</TagName>
			)}
		</>
	);
}

export default ProfileBlockEdit
export {ProfileBlockEdit}

