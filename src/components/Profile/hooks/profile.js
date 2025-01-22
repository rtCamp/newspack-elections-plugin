import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';

const useContextOverAttribute = (props, contextKey = null, attributeKey = null, defaultValue = null) => {
	
	const {attributes, context} = props

	const attrValue = attributes?.[attributeKey] ?? null
	const contextValue = context?.[contextKey] ?? null

	const value = contextValue ?? attrValue ?? defaultValue ?? null
	const isControlledByContext = (contextValue !== null)
	const isControlledByAttribute = ((isControlledByContext === false) && (attrValue !== null))

	return [value, isControlledByContext, isControlledByAttribute]
}

export const useProfileFromContext = ( context ) => {


	let { 
		'govpack/profileId' : profileId = null,
		postId = null,
		postType = false
	} = context

	// Must be within a block that provide a govpack profile context..
	// Or an actual profile page
	if(!profileId && postType !== "govpack_profiles"){
		console.log("no profile id, not profile pt")
		return false;
	} 

	// At least one of profileId or postId exists in context
	if(!profileId && !postId){
	//	console.log("must have a profile id or a postId", profileId, postId, context)
		return false;
	}

	// if using a postType the postId must be set 
	if((postType === "govpack_profiles") && !postId && !profileId){
		//console.log("Must have a postId if using the context postType")
		return false;
	}

	profileId = profileId ?? postId ?? null;
	
	return useSelect( (select) => {
		return select(coreDataStore).getEntityRecord("postType", "govpack_profiles", profileId ) ?? {}
	}, [profileId])

}

export const useProfileId = (props) => {

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

export const useProfile = (profileId) => {

	const query = useSelect( (select) => {
		const selectorArgs = [ 
			'postType', 
			'govpack_profiles',
			profileId,
			{
				_embed : true,
				context: 'edit'
			}
		]

		const hasStartedResolution = select( coreDataStore ).hasStartedResolution(
			"getEntityRecord", // _selectorName_
			selectorArgs
		)
		const hasFinishedResolution = select( coreDataStore ).hasFinishedResolution(
			"getEntityRecord", 
			selectorArgs
		)
		const hasResolutionFailed = select( coreDataStore ).hasResolutionFailed(
			"getEntityRecord", 
			selectorArgs
		)

		return {
			profile : select( coreDataStore ).getEntityRecord(...selectorArgs),
			hasStartedLoading : hasStartedResolution,
			hasFinishedLoading : hasFinishedResolution,
			hasFailed : hasResolutionFailed,
			hasLoaded : (hasFinishedResolution && (!hasResolutionFailed)),
			isLoading : (hasStartedResolution && (!hasFinishedResolution))
		}

	}, [profileId] )

	
	return query
}

export const useProfileAttributes = ( props ) => {

	const { setAttributes, attributes } = props

	const profileId = useProfileId(props)?.profileId
	const {profile, ...profileQuery} = useProfile(profileId)

	const resetProfile = () => {
		setProfile( 0 )
	}

	const setProfile = (newProfileId = 0) => {

		if(newProfileId === null){
			newProfileId = 0
		}
		setAttributes({"profileId" : newProfileId})
	}

	return {setProfile, resetProfile, profileId, profile, profileQuery}
}