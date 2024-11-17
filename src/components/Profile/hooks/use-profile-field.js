import { useProfileFields } from "./use-profile-fields";

export const useProfileField = (fieldName = null) => {
	const fields = useProfileFields();

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