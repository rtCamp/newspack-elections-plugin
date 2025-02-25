

export function getField( state, item) {
	console.log("in getField", state.fields, item)
	return state.fields[item]
}

export function getFields( state ) {
	return Object.keys(state.fields).map( key => state.fields[key])
}
