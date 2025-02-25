import apiFetch from '@wordpress/api-fetch';

export const getField = ( item ) => async ( { dispatch } ) => {
	console.log("getField Resolver")
	const path = addQueryArgs(
		'/govpack/v1/fields',
		query
	);

	dispatch.receiveFieldsQuery( path, fields );
}

/**
 * Requests Fields from the REST API.
 *
 * @param {Object|undefined} query Optional object of query parameters to
 *                                 include with request.
 */
export const getFields = ( query = {} ) => async ( { dispatch } ) => {
	
	const path = '/govpack/v1/fields'
	const fields = await apiFetch( { path } );
	dispatch.receiveFieldsQuery( path, fields );
};