/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps} from "@wordpress/block-editor"

function Edit( {attributes, setAttributes, context, ...props} ) {
	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps(blockProps, {
		template : [
			["govpack/profile-label"],
			["govpack/profile-meta"]
		],
		templateLock : "all"
	});
	

    return (
		<div {...innerBlockProps} />
	)
}

export {Edit}
export default Edit
