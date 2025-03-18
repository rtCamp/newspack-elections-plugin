import {isEmpty} from "lodash"

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { 
	PanelBody, PanelRow, TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	} from '@wordpress/components';
import { InspectorControls } from "@wordpress/block-editor"


import { FieldBlockEdit } from '../../components/field-block-edit';
import { useProfileFieldAttributes } from "./../../profile"
import { useUpdateBlockMetaName } from "./../utils"


function Edit( props ) {

	const {fieldKey, value, profile, field, profileId } =  useProfileFieldAttributes(props) 

	const { attributes, setAttributes } = props
	const { 
		linkTextOverride : labelOverride = "",
		linkFormat
	} = attributes
	

	// should the field's block type not match the current block, render nothing
	if(field.field_type.block !== props.name){
		return null;
	}

	const setLinkTextOverride = (newValue) => {
		setAttributes({linkTextOverride : newValue })
	}

	const setLinkFormat = (newValue) => {
		setAttributes({linkFormat : newValue })
	}

	const rawHref =  value?.url ?? false
	const url =  field.field_type.getUrl(value)

	const showValue = value !== null
	const hasValue = !isEmpty(value)
	
	const calculateLinkText = () => {

		const hasLabelOverride = (labelOverride !== undefined && labelOverride !== "")
		const hasDefaultLabel = (value?.linkText && value?.linkText !== undefined && value?.linkText !== "")
		const defaultLabel = (hasDefaultLabel ? value?.linkText : "Link")

		if(linkFormat === "url"){
			return rawHref;
		}

		if(linkFormat === "label"){
			return (hasLabelOverride ? labelOverride : defaultLabel)
		}

		return defaultLabel
	}
	
	const linkText = calculateLinkText();

	useUpdateBlockMetaName(linkText)

    return (
		<>
			<InspectorControls group="settings">
				<PanelBody title={ __( 'Link Controls', 'govpack' ) }>
					{ (field.field_type.formats.length > 1) && (
						<ToggleGroupControl
							isBlock = {false}
							isAdaptiveWidth = {true}
							isDeselectable = {false}
							label = {"Link Format"}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							value = {linkFormat}
							onChange = { setLinkFormat }
						>
							{ field.field_type.formats.map( (format) => (
								<ToggleGroupControlOption 
									key={`link-formats-${profileId}-${format.value}`} 
									value={format.value} 
									label={format.label} 
								/>
							)) }
						</ToggleGroupControl>
					)}
					<PanelRow>
						<TextControl 
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							label="Override Link Text"
							onChange={setLinkTextOverride}
							value = {labelOverride}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<FieldBlockEdit {...props} hasValue={hasValue}>
				{ (showValue) && (
					<a 
						href={ url }
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
