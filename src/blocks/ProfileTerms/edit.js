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

const useProfileTaxonomies = () => {
	const config = useSelect( (select) => {
		return select( coreDataStore ).getTaxonomies( { type: 'govpack_profiles' } );
	})

	return config
}

const ProfileTerms = ({terms}) => {
	console.log(terms)
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
	console.log("a");
	const { 
		'govpack/profileId' : profileId, 
		postType = false
	} = context

	const tax = "govpack_officeholder_status"
	

	const taxonomies = useProfileTaxonomies();
	const taxonomy = taxonomies?.find( (t) => {
		return t.slug === tax
	})
	
	const { profileTerms, hasProfileTerms, isLoading } = useProfileTerms( profileId, taxonomy)
	const hasProfile = (profileId && postType);

	console.log( profileTerms, isLoading, hasProfile)
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
