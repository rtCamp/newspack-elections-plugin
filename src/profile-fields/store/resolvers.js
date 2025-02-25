import apiFetch from '@wordpress/api-fetch';

export const getField = (item) => {

}

/**
 * Requests Fields from the REST API.
 *
 * @param {Object|undefined} query Optional object of query parameters to
 *                                 include with request.
 */
export const getFields =
	( query ) =>
	async ( { dispatch } ) => {
		const path = '/govpack/v1/profile'
		const fields = await apiFetch( { path } );
		dispatch.receiveFieldsQuery( path, fields );
	};