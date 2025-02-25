import {DEFAULT_STATE} from "./constants"

export const reducer = ( state = DEFAULT_STATE, action) => {
	
	switch ( action.type ) {
		case "RECEIVE_FIELDS_QUERY" : 
			return {
				...state,
				fields : action.fields.reduce( (accum, field) => {
					accum[field.slug] = field
					return accum
				}, state.fields )
			};
	}
	return state;
}

export default reducer