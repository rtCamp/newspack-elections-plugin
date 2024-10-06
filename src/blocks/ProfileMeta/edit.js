/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor"
import { store as editorSore } from "@wordpress/editor"
import { store as coreDataStore, useEntityRecord} from '@wordpress/core-data';
import { useSelect, } from '@wordpress/data';

import { decodeEntities } from '@wordpress/html-entities';

import {Panel, PanelBody, PanelRow, ToggleControl, BaseControl, ButtonGroup, Button, Spinner,SelectControl} from '@wordpress/components';

const useProfile = () => {
	return useSelect( (select) => {
		return select(editorSore).getCurrentPost()
	})
}



export const useProfileFields = () => {
	const fields = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'govpack', 'fields', { per_page: '-1' } ) ?? [];
	} );

	return fields ;
};


const MetaInspectorControl = ({
	setMeta,
	meta
}) => {

	const postType = useSelect( (select) => {
		return select(editorSore).getCurrentPostType()
	})

	const fields = useProfileFields()

	console.log(fields)

	return(
		<InspectorControls>
			<Panel>
				<PanelBody title={ __( 'Field', 'govpack' ) }>
					<PanelRow>
						<SelectControl 
							label = "Field"
							value={ meta } // e.g: value = 'a'
							onChange={ ( selection ) => { setMeta( selection ) } }
							options = {fields.map( ( field ) => {
								return {
									"value" : field.slug,
									"label" : field.label
								}
							})}
							__nextHasNoMarginBottom
						/>
					</PanelRow>
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

	console.log("attributes", attributes);

	const { 
		label = null,
		meta_key = ""
	} = attributes

	const profile = useEntityRecord("postType", "govpack_profiles", profileId).record

	const setMeta = (key) => {
		setAttributes({"meta_key" : key})
	}


	const fields = useProfileFields()
	const field = fields.filter( (field) => {
		return field.slug === meta_key
	})[0];

	console.log("field", field)
	const value = profile?.meta[meta_key];
	const displayLabel = (label ? label : field?.label ?? "")
	
	

    return (
		<>
			<MetaInspectorControl
				meta = {meta_key}
				setMeta = {setMeta}
			/>
			<dd {...blockProps}>
				{ value }
			</dd>
		</>
	)
}

export {Edit}
export default Edit
