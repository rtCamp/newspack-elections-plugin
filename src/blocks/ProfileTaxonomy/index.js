import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
 import Edit from './edit';
 import Save from './save';
 import metadata from './block.json';

 /**
 * Style dependencies - will load in editor
 */
import './view.scss';



const { attributes, category } = metadata;

registerBlockType( metadata.name, {
	apiVersion: 3,
	title: 'GovPack Profile Taxonomy',
    category,
    attributes,
	icon: 'groups',
	keywords: [ 'govpack' ],
    styles: [
	],
	edit : Edit,
	save: Save,
} );
