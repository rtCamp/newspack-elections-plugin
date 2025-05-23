import { useBlockProps } from "@wordpress/block-editor"
import { ProfileSelector as ProfileSelectorPlaceholder } from "./../../../components/ProfileSelector.jsx"

export const ProfileSelector = ( props ) => {

	const {attributes, setAttributes} = props
	const blockProps = useBlockProps();

	const setProfile = (newProfileId) => {
	
		setAttributes({"postId" : newProfileId})
	}


	return (
		<div {...blockProps }>
			<ProfileSelectorPlaceholder setProfile = {setProfile} />
		</div>
	)
}