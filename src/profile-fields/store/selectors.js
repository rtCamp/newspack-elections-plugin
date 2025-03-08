

export function getField( state, item) {
	return state.fields[item]
}

export function getFields( state ) {
	return Object.keys(state.fields).map( key => state.fields[key])
}

export function getFieldTypes( state ) {

	return Object.keys(state.types).map( key => state.types[key])
}

export function getFieldType( state, item) {
	//console.log("getFieldType Selector", state, item)
	return state.types[item]
}
