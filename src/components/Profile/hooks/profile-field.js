import { getProfileFields } from "./profile-fields";

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