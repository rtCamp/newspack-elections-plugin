import { useSelect } from "@wordpress/data"
import { store } from "./"

export const useField = ( slug ) => {
	return useSelect( (select) => {
		return select(store).getField(slug) ?? {}
	}, [slug] )
}

export const useFields = () => {
	return useSelect( (select) => {
		return select(store).getFields() ?? []
	} )
}