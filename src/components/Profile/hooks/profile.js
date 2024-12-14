import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';

export const useProfileFromContext = ( context ) => {

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
	if((postType === "govpack_profiles") && !postId && !profileId){
		//console.log("Must have a postId if using the context postType")
		return false;
	}
	
	return useSelect( (select) => {
		return select(coreDataStore).getEntityRecord("postType", "govpack_profiles", profileId ) ?? {}
	})

}