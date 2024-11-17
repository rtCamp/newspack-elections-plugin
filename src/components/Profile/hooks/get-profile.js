import { useEntityRecord } from '@wordpress/core-data';

export const getProfile = (profileId) => {
	const profile = useEntityRecord("postType", "govpack_profiles", profileId)
	return profile
}