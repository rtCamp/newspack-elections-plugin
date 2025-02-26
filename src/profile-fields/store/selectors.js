

export function getField( state, item) {
	return state.fields[item]
}

export function getFields( state ) {
	return Object.keys(state.fields).map( key => state.fields[key])
}
