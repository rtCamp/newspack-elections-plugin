import { useEntityRecord } from '@wordpress/core-data';

const getProfile = (profileId) => {
	const profile = useEntityRecord("postType", "govpack_profiles", profileId)
	return profile
}