import { registerBlockType } from '@wordpress/blocks';
import { postCategories as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
 import Edit from './edit';
 import Save from './save';
 import metadata from './block.json';
 import dep0_0 from "./deprecated/v.0.0"
 /**
 * Style dependencies - will load in editor
 */
import './view.scss';



const { attributes, category, title } = metadata;

registerBlockType( metadata.name, {
	apiVersion: 3,
	title,
    category,
    attributes,
	icon,
	keywords: [ 'govpack' ],
    styles: [
	],
	deprecated: [
		dep0_0
	],
	edit : Edit,
	save: Save,
} );
