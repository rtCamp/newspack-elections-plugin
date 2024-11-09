/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor"
import { useSelect, } from '@wordpress/data';

export const useProfileFields = () => {
	const fields = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'govpack', 'fields', { per_page: '-1' } ) ?? [];
	} );

	return fields ;
};

function Edit( {attributes, setAttributes, context, ...props} ) {
	const blockProps = useBlockProps();

	const { 
		'govpack/profileId' : profileId, 
		'govpack/profileField' : profileFieldKey, 
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
	

	const fields = useProfileFields()
	const field = fields.filter( (field) => {
		return field.slug === profileFieldKey
	})[0];

	let calculatedLabel;
	if(!label && field){
		calculatedLabel = field?.label ?? "";
	} else {
		calculatedLabel = label;
	}

	console.log("profileFieldKey", profileFieldKey, field)

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
