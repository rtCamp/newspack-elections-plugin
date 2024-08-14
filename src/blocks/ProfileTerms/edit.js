/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from "@wordpress/block-editor"
import { store as coreDataStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { Spinner } from "@wordpress/components";
import { decodeEntities } from '@wordpress/html-entities';

import useProfileTerms from "./use-profile-terms"

/**
 * TODO:
 * 1. Move useProfileTaxonomies to its own, reusable hook
 * 2. Stop Profile Terms outputting clickable links
 * 3. Handle having no terms available
 * 4. Add Inspector Controls to limit how many terms are shown and the seperator used
 */



const useProfileTaxonomies = () => {
	return useSelect( (select) => {
		return select( coreDataStore ).getTaxonomies( { type: 'govpack_profiles' } );
	})
}



const ProfileTerms = ({terms}) => {

	return (<>
	{terms.map( ( postTerm ) => (
		<a
			key={ postTerm.id }
			href={ postTerm.link }
			onClick={ ( event ) => event.preventDefault() }
		>
			{ decodeEntities( postTerm.name ) }
		</a>
	) )
	.reduce( ( prev, curr ) => (
		<>
			{ prev }
			<span className="wp-block-post-terms__separator">
				{ separator || ' ' }
			</span>
			{ curr }
		</>
	) ) } </> )
}

function Edit( {attributes, setAttributes, context, ...props} ) {
	const blockProps = useBlockProps();
	
	const { 
		'govpack/profileId' : profileId, 
		postType = false
	} = context

	const { 
		'taxonomy' : tax, 
	} = attributes

	
	const taxonomies = useProfileTaxonomies();
	const taxonomy = taxonomies?.find( (t) => {
		return t.slug === tax
	})
	
	const { profileTerms, hasProfileTerms, isLoading } = useProfileTerms( profileId, taxonomy)
	const hasProfile = (profileId && postType);

    return (
		<div {...blockProps}>
			{ isLoading && hasProfile && <Spinner /> }
			{ !isLoading && hasProfile && hasProfileTerms && 
				<ProfileTerms terms={profileTerms} />
		 }
		</div>
	)
}

export {Edit}
export default Edit
