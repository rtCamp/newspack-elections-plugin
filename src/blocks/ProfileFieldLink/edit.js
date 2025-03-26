import {isEmpty} from "lodash"

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps} from "@wordpress/block-editor"
import { 
	PanelBody, PanelRow, TextControl, Icon,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	} from '@wordpress/components';



import { useProfileFieldAttributes } from "./../../profile"
import { useUpdateBlockMetaName, useIsPreviewMode } from "./../utils"
import { NPEIcons } from "./../../components/Icons"


const DynamicIcon = ({icon}) => {
	// Todo - make sure this exists
	// move the function call up to the icons component
	const SVG = NPEIcons[icon]()
	return (
		<Icon icon={ SVG } size={24} />
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
		linkFormat
	} = attributes

	

	console.log("link", context, attributes, field)

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

	const hasValue = !isEmpty(value)
	const rawHref =  value?.url ?? false
	const url = (isPreviewMode || !hasValue) ? "" : field?.field_type?.getUrl(value)
	
	const showValue = hasValue || isPreviewMode
	console.log("link showValue", showValue, value)
	
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

	const LinkBody = () => {
		console.log("LinkBody", field)
		if((linkFormat === "icon") && (field?.service)){
			return (<DynamicIcon icon={field.service}/>)
		}

		return (<>{linkText}</>)
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
			<div {...blockProps} >
				{ (showValue) && (
					<a 
						href={ url }
						onClick={ ( event ) => event.preventDefault() }
					>
						<LinkBody />
					</a>
				) }
				
			</div>
		</>
	)
}

export {Edit}
export default Edit
