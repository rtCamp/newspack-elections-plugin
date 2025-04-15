import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';

import { PROFILE_POST_TYPE } from './constants';
import { useAttributeOverContext, useContextOverAttribute } from './utils';
import { useFieldAttributes, useFields } from "./../fields"

/**
 * Gets the ID of the Profile to use from the Block's Context, falling back to Attributes. 
 * Provides an ID and booleans indicating if the ID was found in Context, or Attributes  
 */
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

/**
 * Get the profile specified by the ID passed
 */
export const useProfile = ( profileId ) => {

	const query = useSelect( (select) => {
		const selectorArgs = [ 
			'postType', 
			PROFILE_POST_TYPE,
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

/**
 * Hook that provides profile, profileID, setProfile and reset Profile for blocks that use it.
 */
export const useProfileAttributes = ( props ) => {

	const { setAttributes } = props
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

/**
 * Gets a Profile from a the Blocks Context
 */
export const useProfileFromContext = ( context ) => {

	let { 
		'npe/postId' : selectedProfileId = null,
		postId : pageInheritedPostId = null,
		postType = false
	} = context
	
	
	const profileId = selectedProfileId ?? pageInheritedPostId

	// Must be within a block that provide a govpack profile context..
	// Or an actual profile page
	if(!profileId && postType !== PROFILE_POST_TYPE){
		
		return false;
	} 

	// At least one of profileId or postId exists in context
	if(!profileId){
	//	console.log("must have a profile id or a postId", profileId, postId, context)
		return false;
	}

	return useSelect( (select) => {
		return select(coreDataStore).getEntityRecord("postType", PROFILE_POST_TYPE, profileId ) ?? {}
	}, [profileId])

}

/**
 * Get the defined field objects for a profile enhanced with the value for for that profile
 */
export const useProfileFields = (props) => {

	const {context} = props
	const profile = useProfileFromContext(context) ?? {}
	let fields = useFields()

	

	fields = fields.map( ( field ) => {
	
		let val 
		
		

		if(profile?.profile?.[field.slug]){
			val = profile?.profile?.[field.slug]
		}

		/*
		if(field.type === "taxonomy"){

			val = profile?.profile?.[field.slug]
			
			if(!val || val.length < 1){
				val = ""
			} else {
				val = val.map((f) => f.name).join(", ")
			}

		}
		*/

		if(val && (typeof val === "string")){
			val = val.trim()
		}

		return {
			...field,
			'value' : val
		} 
	})

	return fields
}


export const useProfileFieldAttributes = (props) => {  

	const {context} = props
	const fieldAttrs  = useFieldAttributes(props)
	const profile = useProfileFromContext( context )
	const value = profile?.profile?.[fieldAttrs?.fieldKey] ?? null;
	const profileId = profile.id
	
	return {
		profileId,
		profile,
		value,
		...fieldAttrs
	}
}