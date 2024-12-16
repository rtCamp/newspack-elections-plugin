import { store as coreData} from "@wordpress/core-data"
import { useSelect } from "@wordpress/data"

export const useSelectProfile = (profileId = null) => {
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
		

		const hasStartedResolution = select( coreData ).hasStartedResolution(
			"getEntityRecord", // _selectorName_
			selectorArgs
		)
		const hasFinishedResolution = select( coreData ).hasFinishedResolution(
			"getEntityRecord", 
			selectorArgs
		)
		const hasResolutionFailed = select( coreData ).hasResolutionFailed(
			"getEntityRecord", 
			selectorArgs
		)


		const method = (profileId === 0) ? select( coreData ).getEntityRecords : select( coreData ).getEntityRecord
		
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