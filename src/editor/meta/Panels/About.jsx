import { PanelRow } from "@wordpress/components";
import { useDispatch, useSelect } from '@wordpress/data';

import {GovPackSidebarPanel} from "./../../../components/sidebar-panel"
import {PanelTextControl, PanelDateControl, PanelTextareaControl} from "./../Controls"

import {usePanel} from './usePanel'

import { useEntityId, useEntityProp } from "@wordpress/core-data";

const changeContributesToName = (change) => {

	let keys = Object.keys(change)

	if(keys.length === 0){
		return false
	}
	let searchKeys = ["name_prefix", "name_first", "name_middle", "name_last", "name_suffix"]
	let intersection = keys.filter( i => searchKeys.includes(i) )

	if(intersection.length > 0){
		return true;
	}

	return false;
}

const getNamePieces = (meta, change) => {
	let {
		name_prefix = null, 
		name_first  = null, 
		name_middle = null, 
		name_last   = null, 
		name_suffix = null
	} = meta 

	let pieces = {
		"name_prefix" : name_prefix,
		"name_first"  : name_first,
		"name_middle" : name_middle,
		"name_last"   : name_last,
		"name_suffix" : name_suffix,
	}

	let changeKey = Object.keys(change).at(0)
	pieces[changeKey] = change[changeKey]

	return pieces

}

const assembleName = (pieces) => {
	return Object.values(pieces).join(" ").trim()
}

const fieldTypes = {
	text : PanelTextControl,
	textarea : PanelTextareaControl,
	date : PanelDateControl,
}

export const AboutPanel = (props) => {


	const fields = [
		{
			label : "Name",
			meta_key: "name"
		},{
			label : "Prefix",
			meta_key: "name_prefix"
		},{
			label: "First Name",
			meta_key: "name_first"
		},{
			label: "Middle Name",
			meta_key: "name_middle"
		},{
			label: "Last Name",
			meta_key: "name_last"
		},{
			label: "Suffix",
			meta_key: "name_suffix"
		},{
			label: "Nickname",
			meta_key: "nickname"
		},{
			label: "Occupation",
			meta_key: "occupation"
		},{
			label: "Education",
			meta_key: "education"
		},{
			label: "Gender",
			meta_key: "gender"
		},{
			label: "Race",
			meta_key: "race"
		},{
			label: "Ethnicity",
			meta_key: "ethnicity"
		},{
			label: "Endorsements",
			meta_key: "endorsements",
			type : "textarea"
		},{
			label: "District",
			meta_key: "district"
		},{
			label: "Date of Birth",
			meta_key: "date_of_birth",
			type : "date"
		},{
			label: "Date of Death",
			meta_key: "date_of_death",
			type : "date"
		}
	]

	const fieldsWithComponents = fields.map( (field) => {
		return {
			...field,
			Component : fieldTypes[field.type ?? "text"]
		}
	} )

    return (
        <GovPackSidebarPanel 
            title="About"
            name="gov-profile-about"
        >
			{ fieldsWithComponents.map( ({Component, ...field}, index) => (
				<PanelRow key = {`gp-panel-field-row-about-${index}`}>
					<Component 
						label = { field["label"] } 
						meta_key = { field["meta_key"] }
						onChange = { null } 
					/>
				</PanelRow>
			))}
		</GovPackSidebarPanel>
    )
}