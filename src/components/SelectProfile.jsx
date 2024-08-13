import { store as coreData} from "@wordpress/core-data"
import { useSelect } from "@wordpress/data"

export const useSelectProfile = (profileId = null) => {
	return  useSelect( (select) => {

		const selectorArgs = [ 
			'postType', 
			'govpack_profiles', 
			profileId, 
			{ 
				_embed : true,
				context: 'edit'
			} 
		];

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

		return {
			profile : select( coreData ).getEntityRecord( ...selectorArgs ),
			hasStartedResolution,
			hasFinishedResolution,
			hasResolutionFailed,
			isLoading : (hasStartedResolution && !hasFinishedResolution),

		}
	})
}