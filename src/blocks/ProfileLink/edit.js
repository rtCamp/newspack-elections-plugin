/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from "@wordpress/block-editor"


import { useProfileField,getProfile } from "./../../components/Profile"

function Edit( {attributes, setAttributes, context, ...props} ) {
	const blockProps = useBlockProps();

	const {
		linkFormat
	} = attributes
	const { 
		'govpack/profileId' : profileId, 
		'govpack/profileField' : profileFieldKey, 
		postType = false
	} = context

	const field = useProfileField(profileFieldKey)

	const {record : profile }= getProfile(profileId)
	const profileFields = profile?.profile ?? {}
	
	const outputLink = (href, text) => {
		return (<a href={href}>{text}</a>)
	}

	const outputURL = (url) => {
		return outputLink(url, url)
	}

	
    return (

		<div {...blockProps}>
			
		</div>
		
	)
}

export {Edit}
export default Edit
