import { registerBlockType } from '@wordpress/blocks';
import { postCategories as icon } from '@wordpress/icons';
import { __ } from "@wordpress/i18n"

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
	edit : Edit,
	save: Save,
	/*
	variations : [
		{
			name: 'profile-field-test',
        	title: 'Profile Field (Text)',
        	description: __( 'Embed a Profile Field as Text' ),
        	attributes: { 
				fieldType: 'text' 
			},
		},
		{
			name: 'profile-field-date',
        	title: 'Profile Field (Date)',
        	description: __( 'Embed a Profile Field as a Date' ),
        	attributes: { 
				fieldType: 'date' 
			},
		}
	]*/
} );


