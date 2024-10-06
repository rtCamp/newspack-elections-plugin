/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor"


function Edit( {attributes, setAttributes, context, ...props} ) {
	const blockProps = useBlockProps();

	const { 
		'govpack/profileId' : profileId, 
		postType = false
	} = context

	const { 
		label = null,
		meta_key = ""
	} = attributes

    return (

		<div {...blockProps}>
			
			<RichText
                { ...blockProps }
                tagName="dt" // The tag here is the element output and editable in the admin
                value={ label } // Any existing content, either from the database or an attribute default
                allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
                onChange={ ( label ) => setAttributes( { label } ) } // Store updated content as a block attribute
                placeholder={ __( 'Label...' ) } // Display this text before any content has been added by the user
            />
		</div>
		
	)
}

export {Edit}
export default Edit
