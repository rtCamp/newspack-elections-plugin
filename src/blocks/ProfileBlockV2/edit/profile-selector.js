
import { ProfileSelector as ProfileSelectorPlaceholder } from "./../../../components/ProfileSelector.jsx"

export const ProfileSelector = ( props ) => {

	const {attributes, setAttributes} = props
	

	const setProfile = (newProfileId) => {
	
		setAttributes({"profileId" : newProfileId})
	}


	return (
		<ProfileSelectorPlaceholder setProfile = {setProfile} />
	)
}