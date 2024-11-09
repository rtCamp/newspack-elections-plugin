import { useEntityRecord } from '@wordpress/core-data';

export const getProfile = (profileId) => {
	const profile = useEntityRecord("postType", "govpack_profiles", profileId)
	console.log("profile", profile)
	return profile
}