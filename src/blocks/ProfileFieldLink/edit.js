import {isEmpty} from "lodash"

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { InspectorControls, store as blockEditorStore  } from "@wordpress/block-editor"


import { FieldBlockEdit } from '../../components/field-block-edit';
import { useProfileFieldAttributes } from "./../../components/Profile"


import { useSelect } from "@wordpress/data";

function Edit( props ) {

	const isPreviewMode = useSelect( ( select ) => {
		const { getSettings } = select( blockEditorStore );
		const { isPreviewMode } = getSettings();
		return {
			isPreviewMode,
		};
	}, [] );

	

	const {fieldKey, value, profile, field } =  useProfileFieldAttributes(props) 

	console.log("field", field)
	const { attributes, setAttributes } = props
	const { linkTextOverride = "" } = attributes
	const haslinkTextOverride = (linkTextOverride !== undefined && linkTextOverride !== "")

	const setLinkTextOverride = (newValue) => {
		setAttributes({linkTextOverride : newValue })
	}

	const href =  value?.url ?? false
	const label =  value?.linkText ?? false
	const showValue = value !== null
	const hasValue = !isEmpty(value)
	
	const linkText = (haslinkTextOverride ? linkTextOverride : value?.linkText)

    return (
		<>
			<InspectorControls group="settings">
					
					<PanelBody title={ __( 'Link Controls', 'govpack' ) }>
						<PanelRow>
							<TextControl 
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label="Override Link Text"
								onChange={setLinkTextOverride}
								value = {linkTextOverride}
							/>
						</PanelRow>
					</PanelBody>
				
			</InspectorControls>
			<FieldBlockEdit {...props} hasValue={hasValue}>
				{ (showValue) && (
					<a 
						href={ href }
						onClick={ ( event ) => event.preventDefault() }
					>
						{linkText}
					</a>
				) }
				{ (!fieldKey) && (
					<span>Please Select a Field </span> 
				) }
			</FieldBlockEdit>
		</>
	)
}

export {Edit}
export default Edit
