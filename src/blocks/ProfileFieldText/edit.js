/**
 * External dependencies
 */
import clsx from 'clsx';
import styled from '@emotion/styled';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, useInnerBlocksProps, store as blockEditorStore, useBlockEditContext, BlockContextProvider} from "@wordpress/block-editor"
import { store as editorStore } from "@wordpress/editor"
import { useSelect, useDispatch} from '@wordpress/data';
import {useEffect} from "@wordpress/element"
import { createBlock, store as blocksStore } from "@wordpress/blocks"
import { chevronDown } from '@wordpress/icons';

import { store as coreDataStore } from '@wordpress/core-data';
import {
	__experimentalItemGroup as ItemGroup,
	__experimentalItem as Item,
	__experimentalText as Text,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalVStack as VStack,
	MenuItem,
	MenuGroup,
	MenuItemsChoice,
	DropdownMenu
} from '@wordpress/components';

import {getProfile, useProfileField, useProfileFields, getProfileField} from "./../../components/Profile"

import { useContext } from 'react';
import { useViewportMatch } from '@wordpress/compose';

const useToolsPanelDropdownMenuProps = () => {
	const isMobile = useViewportMatch( 'medium', '<' );
	return ! isMobile
		? {
				popoverProps: {
					placement: 'left-start',
					// For non-mobile, inner sidebar width (248px) - button width (24px) - border (1px) + padding (16px) + spacing (20px)
					offset: 259,
				},
		  }
		: {};
};

const ToolsPanelItemWide = styled( ToolsPanelItem )`
	grid-column: span 2;
`;

function FieldDropdown( {
	className,
	onSelectField,
	selectedValue,
	fields
} ) {

	const selectedOptions = fields.map( (f) => ({
		...f,
		disabled : (!f.info ? true : false)
	}))

	return (
		<DropdownMenu
			className={ className }
			label={ __( 'Profile Field' ) }
			text={ __( 'Profile Field' ) }
			popoverProps={ {
				position: 'bottom center',
				className: `${ className }__popover`,
			} }
			icon={ chevronDown }
			toggleProps={ { iconPosition: 'right' } }
		>
			{ () => (
				<div className={ `${ className }__container` }>
					<MenuGroup>
						<MenuItemsChoice
							choices={ selectedOptions }
							value={ selectedValue }
							onSelect={ (v) => {
								console.log(v)
								onSelectField(v) 
							}}
						/>
					</MenuGroup>
				</div>
			) }
		</DropdownMenu>
	);
}

const MetaInspectorControl = ({
	fieldKey,
	setFieldKey,
	fieldType = "text",
	fields
}) => {


	const dropdownMenuProps = useToolsPanelDropdownMenuProps()
	const isMobile = useViewportMatch( 'medium', '<' );

	return(
		<InspectorControls>
			<ToolsPanel
				label={ __( 'Profile Fields' ) }
				dropdownMenuProps={ dropdownMenuProps }
			>
				
					<ToolsPanelItemWide
						isShownByDefault = {true}
						key={ "field" }
						hasValue={ () => !! fieldKey }
						label={ "Profile Field" }
					>
						
						<FieldDropdown 
							className={ 'govpack-profile-field-select' }
							onSelectField={ setFieldKey }
							selectedValue={ fieldKey }
							fields={ fields }
						/>
					</ToolsPanelItemWide>
	
			</ToolsPanel>
		</InspectorControls>
	)
}




const useProfile = ( context ) => {


	let { 
		'govpack/profileId' : profileId = null,
		postId = null,
		postType = false
	} = context

	// Must be within a block that provide a govpack profile context..
	// Or an actual profile page
	if(!profileId || postType !== "govpack_profiles"){
		console.log("no profile id, not profile pt")
		return false;
	} 

	// At least one of profileId or postId exists in context
	if(!profileId && !postId){
		console.log("must have a profile id or a postId")
		return false;
	}

	// if using a postType the postId must be set 
	if((postType === "govpack_profiles") && !postId){
		console.log("Must have a postId if using the context postType")
		return false;
	}
	
	return useSelect( (select) => {
		return select(coreDataStore).getEntityRecord("postType", "govpack_profiles", profileId ) ?? {}
	})


}

function Edit( {attributes, setAttributes, context, clientId, ...props} ) {


	/**
	 * Get Data From Parent Blocks
	 */
	const { 
		'govpack/profileId' : profileId, 
		postType = false
	} = context

	/**
	 * Get Data From This Blocks
	 */
	const { 
		fieldKey = "name",
		fieldType = "text"
	} = attributes


	/**
	 * Get The Profile used
	 */
	const profile = useProfile(context) ?? {}
	const fields = 	useProfileFields(fieldType)

	const enhancedFields = fields.map( ( { slug, label, ...field } ) => {
		let val = profile?.[field.source]?.[slug] || false
		return {
			value: slug,
			label: label,
			info: val ?? "",
		} 
	}
	);


	/**
	 * Get Data From The Editor
	 */
	const blockProps = useBlockProps();

	

	const FieldType = useProfileField(fieldKey)
	const FieldValue = profile?.[FieldType.source]?.[fieldKey] || "[[" + fieldKey + "]]" ;

	const setFieldKey = (newKey) => {
		console.log("setFieldKey", newKey)
		setAttributes({"fieldKey" : newKey})
	}

    return (
		<>
			<MetaInspectorControl
				fieldKey = {fieldKey}
				setFieldKey = {setFieldKey}
				fieldType = {fieldType}
				fields = { enhancedFields }
			/>

			
			<div {...blockProps}>
				{FieldValue}
			</div>
			
		</>
	)
}

export {Edit}
export default Edit
