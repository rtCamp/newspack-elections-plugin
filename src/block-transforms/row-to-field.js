


export const createRowToFieldTransform = ( RowName ) => {
	return {
		type: 'block',
		blocks: [ 'govpack/profile-row' ],
		transform: ( attributes  ) => {
			return createBlock( RowName, attributes );
		},
	}
}