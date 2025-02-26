import { useSelect } from "@wordpress/data"
import { store } from "./store"

export const useField = ( slug ) => {
	return useSelect( (select) => {
		return select(store).getField(slug) ?? {}
	}, [slug] )
}

export const useFields = ( slug ) => {
	return useSelect( (select) => {
		return select(store).getFields() ?? []
	}, [slug] )
}