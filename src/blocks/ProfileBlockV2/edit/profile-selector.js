
import { ProfileSelector as ProfileSelectorPlaceholder } from "./../../../components/ProfileSelector.jsx"

export const ProfileSelector = ( {attributes, setAttributes, ...props} ) => {

	const setProfile = (newProfileId) => {
		setAttributes({"profileId" : newProfileId})
	}
	
	return (
		<ProfileSelectorPlaceholder setProfile = {setProfile} />
	)
}