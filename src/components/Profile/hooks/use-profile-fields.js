import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";

export const useProfileFields = () => {
	const fields = useSelect( ( select ) => {
		return select( coreStore ).getEntityRecords( 'govpack', 'fields', { per_page: '-1' } ) ?? [];
	} );

	return fields ;
};