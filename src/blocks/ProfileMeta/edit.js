/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { store as editorSore } from "@wordpress/editor"
import { useEntityRecord} from '@wordpress/core-data';
import { useSelect, } from '@wordpress/data';
import { Panel, PanelBody, PanelRow, SelectControl } from '@wordpress/components';

import { useProfileFields } from "./../../components/Profile"


const MetaInspectorControl = ({
	setMeta,
	meta
}) => {

	const postType = useSelect( (select) => {
		return select(editorSore).getCurrentPostType()
	})

	const fields = useProfileFields()

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


	const { 
		label = null,
		meta_key = ""
	} = attributes

	const profile = useEntityRecord("postType", "govpack_profiles", profileId).record

	const setMeta = (key) => {
		setAttributes({"meta_key" : key})
	}


	const field = useProfileFields(meta_key)


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
