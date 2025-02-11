import {isEmpty} from "lodash"

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { FieldBlockEdit } from '../../components/field-block-edit';
import { useProfileFieldAttributes } from './../../components/Profile';


import { useSelect } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor"


function Edit( props ) {



	const { fieldKey, value, field } =  useProfileFieldAttributes(props) 

	const isPreviewMode = useSelect( ( select ) => {
		return select( blockEditorStore ).getSettings().isPreviewMode;
	}, [] );



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

    return (
		<>
			
			<FieldBlockEdit 
				{...props} 
				defaultValue = "No Field Value"
				hasValue = {hasValue}
			>
				{FieldValue}
			</FieldBlockEdit>
		</>
	)
}



export {Edit}
export default Edit
