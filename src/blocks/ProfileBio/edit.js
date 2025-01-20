import {isEmpty} from "lodash"

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from "@wordpress/block-editor"
import { store as coreStore } from '@wordpress/core-data'
import { useSelect } from '@wordpress/data';
import { useMemo } from "@wordpress/element"
/**
 * Internal dependencies
 */
import { FieldBlockEdit } from '../../components/field-block-edit';
import { useProfileFieldAttributes } from './../../components/Profile';





function Edit( props ) {

	const { fieldKey, value : renderedExcerpt, field } =  useProfileFieldAttributes(props) 
	const blockProps = useBlockProps()

	const { context } = props
	const { postType } = context

	const postTypeSupportsExcerpts = useSelect(
		( select ) => {
			return !! select( coreStore ).getPostType( postType )?.supports?.excerpt;
		},
		[ postType ]
	);

	

	
	

	/**
	 * When excerpt is editable, strip the html tags from
	 * rendered excerpt. This will be used if the entity's
	 * excerpt has been produced from the content.
	 */
	const strippedRenderedExcerpt = useMemo( () => {
		if ( ! renderedExcerpt ) {
			return '';
		}
		const document = new window.DOMParser().parseFromString(
			renderedExcerpt,
			'text/html'
		);
		return document.body.textContent || document.body.innerText || '';
	}, [ renderedExcerpt ] );

	let excerpt  = strippedRenderedExcerpt
	const hasValue = !isEmpty(excerpt)

	if(!postTypeSupportsExcerpts){
		return null
	}

    return (
		<div {...blockProps}>
			{ excerpt }
		</div>
	)
}



export {Edit}
export default Edit
