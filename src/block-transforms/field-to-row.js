import { createBlock } from '@wordpress/blocks';

export const FieldToRow = {
	type: 'block',
	blocks: [ 'govpack/profile-row' ],
	transform: ( attributes  ) => {
		return createBlock( 'govpack/profile-row', attributes );
	},
}