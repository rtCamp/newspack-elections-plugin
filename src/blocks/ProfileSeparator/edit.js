/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from "@wordpress/block-editor"


function Edit( {attributes, setAttributes, context, ...props} ) {
	const blockProps = useBlockProps();

	return (
		<hr {...blockProps} />
	)
}

export {Edit}
export default Edit
