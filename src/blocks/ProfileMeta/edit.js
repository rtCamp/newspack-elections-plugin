/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor"
import { store as editorSore } from "@wordpress/editor"
import { store as coreDataStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

import { decodeEntities } from '@wordpress/html-entities';

import {Panel, PanelBody, PanelRow, ToggleControl, BaseControl, ButtonGroup, Button, Spinner} from '@wordpress/components';

const useProfile = () => {
	return useSelect( (select) => {
		return select(editorSore).getCurrentPost()
	})
}

const MetaInspectorControl = () => {

	const postType = useSelect( (select) => {
		return select(editorSore).getCurrentPostType()
	})

	const profile = useProfile()

	console.log(profile)

	return(
		<InspectorControls>
			<Panel>
				<PanelBody title={ __( 'Meta', 'govpack' ) }>
				</PanelBody>
			</Panel>
		</InspectorControls>
	)
}

function Edit( {attributes, setAttributes, context, ...props} ) {
	const blockProps = useBlockProps();

	const { 
		'govpack/profileId' : profileId, 
		postType = false
	} = context

	const { 
		label = null
	} = attributes

	

    return (

		<div {...blockProps}>
			<MetaInspectorControl	/>
			<RichText
                { ...blockProps }
                tagName="p" // The tag here is the element output and editable in the admin
                value={ label } // Any existing content, either from the database or an attribute default
                allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
                onChange={ ( label ) => setAttributes( { label } ) } // Store updated content as a block attribute
                placeholder={ __( 'Label...' ) } // Display this text before any content has been added by the user
            />
			<hr />
			<div>
				Selected Meta Value
			</div>
		</div>
		
	)
}

export {Edit}
export default Edit
