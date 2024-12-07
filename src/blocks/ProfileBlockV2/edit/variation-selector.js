
import { useSelect } from '@wordpress/data';
import {
	__experimentalBlockVariationPicker as BlockVariationPicker
} from '@wordpress/block-editor';
import { store as blocksStore } from '@wordpress/blocks';


export const ProfileVariationSelector = ({ blockName } ) => {
	const variations = useSelect(
		( select ) => {
			const { getBlockVariations } = select( blocksStore );
			return getBlockVariations( blockName, 'block' ) ?? [];
		},
		[ blockName ]
	);
	return <BlockVariationPicker variations={ variations } />;
}


