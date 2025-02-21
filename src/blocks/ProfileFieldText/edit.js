import {isEmpty} from "lodash"

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from "@wordpress/element"

/**
 * Internal dependencies
 */
import { FieldBlockEdit } from '../../components/field-block-edit';
import { useProfileFieldAttributes } from './../../components/Profile';


import { useSelect } from "@wordpress/data";
import { store as blockEditorStore, useBlockProps } from "@wordpress/block-editor"

import { useUpdateBlockMetaName } from "../utils"

function Edit( props ) {

	const { setAttributes, attributes } = props
	const { fieldKey, value, field } =  useProfileFieldAttributes(props) 
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

	/*
	useEffect( () => {

		if(!hasValue){
			return
		}

		if(!value){
			return
		}

		setAttributes({"metadata" : {
			...attributes.metadata,
			name: value
		}})
	
	}, [value, hasValue])
	*/
	
	

    return (
		<div {...blockProps} >
			{FieldValue}
		</div>
	)
}



export {Edit}
export default Edit
