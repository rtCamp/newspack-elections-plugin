import { useSelect } from "@wordpress/data";
import { store as coreStore, useEntityRecord } from "@wordpress/core-data";




const useProfileFields = (type = null) => {
	
	const fields = useSelect( ( select ) => {
		return select( coreStore ).getEntityRecords( 'govpack', 'fields', { per_page: '-1' } ) ?? [];
	} );

	if(type !== null){
		return fields.filter( field => field.type === type )
	}

	return fields ;
};



const getProfile = (profileId) => {
	const profile = useEntityRecord("postType", "govpack_profiles", profileId)
	return profile
}



 const useProfileField = (fieldName = null) => {
	return getProfileField(fieldName);
};

 const getProfileField = (fieldName = null) => {
	const fields = getProfileFields();

	if(fields.length === 0){
		return new Object()
	}

	if(fieldName === null){
		return new Object()
	}

	const field = fields.filter( (field) => {
			return field.slug === fieldName
	})[0];

	

	return field ;
};



//export const useProfileFields = (type = null) => {
//	return getProfileFields(type) ;
//};

 const getProfileFields = (type = null) => {
	
	const fields = useSelect( ( select ) => {
		return select( coreStore ).getEntityRecords( 'govpack', 'fields', { per_page: '-1' } ) ?? [];
	} );

	if(type !== null){
		return fields.filter( field => field.type === type )
	}

	return fields ;
};



 const useSelectProfile = (profileId = null) => {
	return  useSelect( (select) => {


		const selectorArgs = [ 
			'postType', 
			'govpack_profiles'
		]
		
		if(profileId !== 0){
			selectorArgs.push(profileId)
		}

		selectorArgs.push({ 
			_embed : true,
			context: 'edit'
		})
		

		const hasStartedResolution = select( coreStore ).hasStartedResolution(
			"getEntityRecord", // _selectorName_
			selectorArgs
		)
		const hasFinishedResolution = select( coreStore ).hasFinishedResolution(
			"getEntityRecord", 
			selectorArgs
		)
		const hasResolutionFailed = select( coreStore ).hasResolutionFailed(
			"getEntityRecord", 
			selectorArgs
		)


		const method = (profileId === 0) ? select( coreStore ).getEntityRecords : select( coreStore ).getEntityRecord
		
		const query = method( ...selectorArgs )
		const profile = (profileId === 0) ? query?.[0] : query

		return {
			profile : profile,
			hasStartedResolution,
			hasFinishedResolution,
			hasResolutionFailed,
			isLoading : (hasStartedResolution && !hasFinishedResolution),

		}
	}, [profileId])
}


export const useProfileData = (context) => {

	const profile = useProfileFromContext(context) ?? {}
	let fields = useProfileFields()

	fields = fields.map( ( field ) => {
	
		let val
		if(field.type === "link"){
			val = profile?.profile?.[field.slug].url || false
		} else {
			val = profile?.profile?.[field.slug] || false
		}
		
		
		if(val){
			val = val.trim()
		}

		return {
			...field,
			'value' : val
		} 
	}
	);

	return {profile, fields}

}