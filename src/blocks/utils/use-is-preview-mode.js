import {useSelect} from "@wordpress/data"
import { store as blockEditorStore } from "@wordpress/block-editor"

export const useIsPreviewMode = () => {
	return useSelect( ( select ) => {
		const settings = select( blockEditorStore ).getSettings()
		return settings?.isPreviewMode ?? settings?.__unstableIsPreviewMode ?? false
	}, [] );
}

export default useIsPreviewMode