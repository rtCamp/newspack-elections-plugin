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

const useAttributeOverContext = (props, contextKey = null, attributeKey = null, defaultValue = null) => {
	
	const {attributes, context} = props

	const attrValue = attributes?.[attributeKey] ?? null
	const contextValue = context?.[contextKey] ?? null

	const value = attrValue ?? contextValue ?? defaultValue ?? null
	const isControlledByAttribute = ( attrValue !== null)
	const isControlledByContext = ((isControlledByAttribute === false) && (contextValue !== null))

	return [value, isControlledByContext, isControlledByAttribute]
}

export const useProfileFromContext = ( context ) => {



	let { 
		postId : profileId = null,
		postType = false
	} = context

	// Must be within a block that provide a govpack profile context..
	// Or an actual profile page
	if(!profileId && postType !== "govpack_profiles"){
		
		return false;
	} 

	// At least one of profileId or postId exists in context
	if(!profileId){
	//	console.log("must have a profile id or a postId", profileId, postId, context)
		return false;
	}



	
	return useSelect( (select) => {
		return select(coreDataStore).getEntityRecord("postType", "govpack_profiles", profileId ) ?? {}
	}, [profileId])

}

export const useProfileId = (props) => {

	const { context } = props

	const { 
		postType = null,
		queryId = null
	} = context

	const isQuery = (queryId && postType) ? true : false
	const contextSource = useContextOverAttribute(props, "postId", "postId")
	const attrSource = useAttributeOverContext(props, "postId", "postId")

	// if queryId exists and postType then we're inside a query loop
	const source = isQuery ? contextSource : attrSource
	
	const [profileId, isControlledByContext, isControlledByAttribute] = source

	return {
		profileId,
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

	const {profileId} = useProfileId(props)

	const {profile, ...profileQuery} = useProfile(profileId)

	const resetProfile = () => {
		setProfile( 0 )
	}

	const setProfile = (newProfileId = 0) => {

		if(newProfileId === null){
			newProfileId = 0
		}
		setAttributes({"postId" : newProfileId})
	}

	return {setProfile, resetProfile, profileId, profile, profileQuery}
}