/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from "@wordpress/block-editor"


import { useProfileField } from "./../../components/Profile"

function Edit( {attributes, setAttributes, context, ...props} ) {
	const blockProps = useBlockProps();

	const { 
		'govpack/profileId' : profileId, 
		'govpack/profileField' : profileFieldKey, 
		postType = false
	} = context

	const field = useProfileField(profileFieldKey)

	

    return (

		<div {...blockProps}>
			
			<RichText
                { ...blockProps }
                tagName="span" // The tag here is the element output and editable in the admin
                value={ "LINK" } // Any existing content, either from the database or an attribute default
                allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
                onChange={ ( label ) => {
					return;
				} } // Store updated content as a block attribute
                placeholder={ __( 'LINK' ) } // Display this text before any content has been added by the user
            />
		</div>
		
	)
}

export {Edit}
export default Edit
