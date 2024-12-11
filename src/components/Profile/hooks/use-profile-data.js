import { useProfileFromContext } from "./use-profile-from-context";
import { useProfileFields } from "./get-profile-fields"

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