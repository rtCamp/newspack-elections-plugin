import {isEmpty} from "lodash"

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, RichText} from "@wordpress/block-editor"
import { 
	PanelBody, PanelRow, TextControl, Icon,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	} from '@wordpress/components';

import { useState } from "@wordpress/element"


import { useProfileFieldAttributes } from "@npe/editor"
import { useUpdateBlockMetaName, useIsPreviewMode } from "./../utils"
import { NPEIcons } from "./../../components/Icons"

const sizeOptions = [
	{ name: __( 'Small' ), value: 12 },
	{ name: __( 'Normal' ), value: 18 },
	{ name: __( 'Large' ), value: 24 },
	{ name: __( 'Huge' ), value: 30 },
];



const DynamicIcon = ({icon, size = 24}) => {
	// Todo - make sure this exists
	// move the function call up to the icons component
	const SVG = NPEIcons[icon]
	console.log("SVG", SVG)
	return (
		<Icon icon={ SVG } size={size} />
	)
}

function Edit( props ) {

	const {fieldKey, value, profile, field, profileId, fieldType } =  useProfileFieldAttributes(props) 
	const blockProps = useBlockProps()
	const isPreviewMode = useIsPreviewMode()
	const isInnerBlockMode = (fieldType === "block")
	const { attributes, setAttributes, context } = props
	const { 
		linkTextOverride : labelOverride = "",
		linkFormat,
		iconSize = 24
	} = attributes

	console.log("field", field)
	console.log("icon", field.display_icon)
	
	
	const [iconSlug, setIconSlug] = useState( field.service ?? field.display_icon ?? null )

	// should the field's block type not match the current block, render nothing
	if(!isInnerBlockMode && (field?.field_type?.block !== props.name)){
		return null;
	}

	const setLinkTextOverride = (newValue) => {
		setAttributes({linkTextOverride : newValue })
	}

	const setLinkFormat = (newValue) => {
		setAttributes({linkFormat : newValue })
	}

	const setIconSize = (newValue) => {
		setAttributes({iconSize : newValue })
	}

	const hasValue = !isEmpty(value)
	const rawHref =  value?.url ?? false
	const url = (isPreviewMode || !hasValue) ? "" : field?.field_type?.getUrl(value)
	
	const showValue = hasValue || isPreviewMode

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

	//useUpdateBlockMetaName(linkText)

	const LinkBody = () => {
		
		if(linkFormat === "label"){
			return (
				<RichText
					identifier="labelOverride"
					tagName="a"
					aria-label={ __( '“Read more” link text' ) }
					placeholder={ linkText }
					value={ labelOverride }
					onChange={ ( newValue ) =>
						setLinkTextOverride( newValue )
					}
					withoutInteractiveFormatting
				/>
			)
		}

		const showIcon = ((linkFormat === "icon") && (iconSlug))
		const showUrl = ((linkFormat === "url")) 

		return (
			<a 
				href="#"
				onClick={ ( event ) => event.preventDefault() }
			>
				{showIcon && (
					<DynamicIcon icon={iconSlug} size={iconSize}/>
				)}

				{showUrl && (
					<>{linkText}</>
				)}
			</a>
		)
	}


    return (
		<>
			<InspectorControls group="settings">
				<PanelBody title={ __( 'Link Controls', 'govpack' ) }>
					{ (field?.field_type?.formats.length > 1) && (
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
							{ field?.field_type?.formats.map( (format) => (
								<ToggleGroupControlOption 
									key={`link-formats-${profileId}-${format.value}`} 
									value={format.value} 
									label={format.label} 
								/>
							)) }
						</ToggleGroupControl>
					)}
					{ (linkFormat === "label") && (
						<PanelRow>
							<TextControl 
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label="Override Link Text"
								onChange={setLinkTextOverride}
								value = {labelOverride}
							/>
						</PanelRow>
					)}

					{ (linkFormat === "icon") && (
						<PanelRow>
							<ToggleGroupControl
								isBlock = {false}
								isAdaptiveWidth = {true}
								isDeselectable = {false}
								label = {"Icon Size"}
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								value = {iconSize}
								onChange = { setIconSize }
							>
								{ sizeOptions.map( (size) => (
									<ToggleGroupControlOption 
										key={`link-size-${profileId}-${size.value}`} 
										value={size.value} 
										label={size.name} 
									/>
								)) }
							</ToggleGroupControl>
						</PanelRow>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...blockProps} >
				{ (showValue) && ( <LinkBody /> ) }
			</div>
		</>
	)
}

export {Edit}
export default Edit
