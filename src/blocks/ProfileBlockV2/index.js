import { registerBlockCollection, registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { addFilter } from "@wordpress/hooks"

/**
 * Internal dependencies
 */
 import {ProfileEdit as Edit} from './edit/index';
 import Save from './save';
 import metadata from './block.json';

 /**
 * Style dependencies - will load in editor
 */
import './view.scss';
import { variations } from './variations';
import {withRestrictedAllowedBlocks} from "./edit/restrict-allowed-blocks"
const { attributes, category, supports } = metadata;



supports.color.__experimentalSkipSerialization = ["background"]

// Add the filter
/*
addFilter(
    'editor.BlockEdit',
    'govpack/restrict-allowed-blocks',
    withRestrictedAllowedBlocks
);

*/
registerBlockType( metadata.name, {
	apiVersion: 3,
	title: 'Newspack Elections Profile v2',
    category,
    attributes,
	supports,
	icon: 'groups',
	keywords: [ 'govpack' ],
    styles: [
	],
	edit : Edit,
	save: Save,
	
} );


// Our filter function
function lockParagraphs( blockAttributes, blockType, innerHTML, attributes  ) {
    if('core/paragraph' === blockType.name) {
        blockAttributes['lock'] = {move: true}
    }
    return blockAttributes;
}




registerBlockVariation(metadata.name, variations)

