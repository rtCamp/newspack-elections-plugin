import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";

//export const useProfileFields = (type = null) => {
//	return getProfileFields(type) ;
//};

export const getProfileFields = (type = null) => {
	
	const fields = useSelect( ( select ) => {
		return select( coreStore ).getEntityRecords( 'govpack', 'fields', { per_page: '-1' } ) ?? [];
	} );

	if(type !== null){
		return fields.filter( field => field.type === type )
	}

	return fields ;
};