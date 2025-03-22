import {isEmpty} from "lodash"

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from "@wordpress/block-editor"

/**
 * Internal dependencies
 */
import { useProfileFieldAttributes } from './../../profile';

import { useUpdateBlockMetaName } from "./../utils"

function Edit( props ) {

	const { setAttributes, attributes } = props
	const { fieldKey, value, field, ...restFieldAttrs } =  useProfileFieldAttributes(props) 
	const blockProps = useBlockProps()



	const profileValue = () => {

		if(field.type === "link"){
			let url = value?.url;
			return (<a href={ url }>{ url }</a>)
		}

		if(typeof value === "object"){
			return ""
		}

		return value.trim()
	}

	const FieldValue = profileValue(fieldKey)
	const hasValue = !isEmpty(FieldValue)


	useUpdateBlockMetaName(FieldValue)


    return (
		<div {...blockProps} >
			{FieldValue}
		</div>
	)
}



export {Edit}
export default Edit
