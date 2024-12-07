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
		'govpack/fieldKey' : profileFieldKey, 
		'govpack/showLabel' : showLabel = true, 
		postType = false
	} = context

	const { 
		label = null,
	} = attributes

	const updateLabel = (label) => {
		setAttributes({
			metadata: { ...attributes.metadata, name : label }, 
			label
		})
	}
	
	const field = useProfileField(profileFieldKey)

	let calculatedLabel;
	if(!label && field){
		calculatedLabel = field?.label ?? "";
	} else {
		calculatedLabel = label;
	}

	if( ! showLabel ) {
		return null;
	}

    return (

		<div {...blockProps}>
			
			<RichText
                { ...blockProps }
                tagName="span" // The tag here is the element output and editable in the admin
                value={ calculatedLabel } // Any existing content, either from the database or an attribute default
                allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
                onChange={ ( label ) => updateLabel( label ) } // Store updated content as a block attribute
                placeholder={ __( 'Label...' ) } // Display this text before any content has been added by the user
            />
		</div>
		
	)
}

export {Edit}
export default Edit
