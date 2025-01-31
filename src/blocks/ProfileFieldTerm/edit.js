import styled from '@emotion/styled';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from "@wordpress/block-editor"
import { store as coreDataStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { Spinner, PanelBody, PanelRow, ToggleControl, TextControl, RangeControl,
	__experimentalVStack as VStack
} from "@wordpress/components";
import { decodeEntities } from '@wordpress/html-entities';

import { ProfileFieldsInspectorControl, ProfileFieldsToolBar } from "../../components/Controls/ProfileField"
import { useProfileFieldAttributes, useFieldsOfType } from "./../../components/Profile"

import useProfileTerms from "./use-profile-terms"

import { FieldBlockEdit } from '../../components/field-block-edit';


const WideRangeControl = styled( RangeControl )`
	width: 100%
`;

/**
 * TODO:
 * 1. Move useProfileTaxonomies to its own, reusable hook
 * 2. Handle having no terms available
 */



const useProfileTaxonomies = () => {
	return useSelect( (select) => {
		return select( coreDataStore ).getTaxonomies( { type: 'govpack_profiles' } );
	})
}

const ProfileTermSpan = ({postTerm}) => {

	return (
		<span key={ postTerm.id } >
			{ decodeEntities( postTerm.name ) }
		</span>
	)
}

const ProfileTermLink = ({postTerm}) => {
	return (
		<a 
			key={ postTerm.id } 
			href={ postTerm.link }
			onClick={ ( event ) => event.preventDefault() }
		>
			{ decodeEntities( postTerm.name ) }
		</a>
	)
}

const ProfileTerms = ({terms, displayLinks, separator, termLimit}) => {
	
	const Element = displayLinks ? ProfileTermLink : ProfileTermSpan

	if(termLimit === 0){
		return null
	}


	return (<>
		{terms.slice(0, termLimit).map( ( postTerm ) => (
			<Element postTerm={postTerm} />
		) ).reduce( ( prev, curr ) => (
		<>
			{ prev }
			<span className="wp-block-post-terms__separator">
				{ separator || ' ' }
			</span>
			{ curr }
		</>
	) ) } </> )
}

function Edit( props ) {
	
	const { attributes, setAttributes, context } = props
	const { 
		displayLinks,
		separator,
		termLimit
	} = attributes

	const { profileId, field } =  useProfileFieldAttributes(props) 

	
	const taxonomySlug = field?.taxonomy ?? attributes.taxonomy ?? null
	const taxonomies = useProfileTaxonomies();
	const selectedTaxonomy = taxonomies?.find( (t) => {
		return t.slug === taxonomySlug
	})

	
	
	const { profileTerms, hasProfileTerms, isLoading } = useProfileTerms( profileId, selectedTaxonomy )
	const hasProfile = (profileId);

	
    return (
		<>
		<InspectorControls>
			<PanelBody title="Profile Term">
			 <PanelRow>
				<ToggleControl 
					__nextHasNoMarginBottom
					label="Output Terms as Links?"
					help={
						displayLinks
							  ? 'Profile Terms are links.'
							  : 'Profile Terms are not links.'
					}
					checked={ displayLinks }
					onChange={ (newValue) => {
						setAttributes( { "displayLinks" :  newValue } );
					} }
				/>
			 </PanelRow>
			 <PanelRow>
				<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						autoComplete="off"
						label={ __( 'Separator' ) }
						value={ separator || '' }
						onChange={ ( nextValue ) => {
							setAttributes( { separator: nextValue } );
						} }
						help={ __( 'Enter character(s) used to separate terms.' ) }
					/>
			</PanelRow>
			<PanelRow>
				
					<WideRangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Term Limit' ) }
						value={ termLimit }
						onChange={ ( value ) =>
							setAttributes( {"termLimit": Math.max( 1, value )})
						}
						min={ 0 }
						max={ 10 }
					/>
			
			</PanelRow>
			</PanelBody>
		</InspectorControls>
		<FieldBlockEdit {...props} hasValue={hasProfileTerms} >
			{ isLoading && hasProfile && <Spinner /> }
			{ !isLoading && hasProfile && hasProfileTerms && 
				<ProfileTerms 
					terms={profileTerms} 
					displayLinks={displayLinks} 
					separator = {separator}
					termLimit = {termLimit}
				/>
		 	}
		</FieldBlockEdit>
		</>
	)
}

export {Edit}
export default Edit
