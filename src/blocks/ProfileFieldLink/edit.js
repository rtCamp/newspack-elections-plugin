import {isEmpty} from "lodash"

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';


import { FieldBlockEdit } from '../../components/field-block-edit';
import { useProfileFieldAttributes } from "./../../components/Profile"


function Edit( props ) {

	const {fieldKey, value, profile } =  useProfileFieldAttributes(props) 
	
	const href =  value?.url ?? false
	const label =  value?.linkText ?? false
	const showValue = value !== null
	const hasValue = !isEmpty(value)
	
	console.log("value", value, profile);

    return (
		<FieldBlockEdit {...props} hasValue={hasValue}>
			{ (showValue) && (
				<a href={href}>{label}</a>
			) }
			{ (!fieldKey) && (
				<span>Please Select a Field </span> 
			) }
		</FieldBlockEdit>
	)
}

export {Edit}
export default Edit
