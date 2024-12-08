import { registerBlockCollection, registerBlockType, registerBlockVariation } from '@wordpress/blocks';

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

const { attributes, category } = metadata;



registerBlockType( metadata.name, {
	apiVersion: 3,
	title: 'GovPack Profile v2',
    category,
    attributes,
	icon: 'groups',
	keywords: [ 'govpack' ],
    styles: [
	],
	edit : Edit,
	save: Save,
	
} );




registerBlockVariation(metadata.name, variations)

