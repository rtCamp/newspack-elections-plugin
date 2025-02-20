import { useState } from "@wordpress/element"

import {
	MenuGroup,
	MenuItemsChoice,
	TextHighlight,
	SearchControl
} from '@wordpress/components';

export function ProfileFieldsMenu({
	onSelectField,
	fields,
	selectedValue,
	showFieldsWithEmptyValues = true,
	disableEmptyFields = true,
	emptyProfileValueText = "-"
} = props){

	const [searchText, setSearchText] = useState("")
	const hasSearchText = (searchText !== "")

	let allChoices = fields.map( (f) => {
		const info = (f.value && f.value !== "") ? f.value : emptyProfileValueText
		return {
			label : (<TextHighlight text={f.label} highlight={searchText}/>),
			label_raw : f.label,
			value : f.slug,
			info_raw : info,
			info: (<TextHighlight text={info} highlight={searchText}/>),
			disabled : ( (disableEmptyFields && (!f.value || f.value === "")) ? true : false)
		}
	})

	let filteredChoices = !hasSearchText ? 
		allChoices :
		allChoices.filter( (f) => {
			const search = searchText.toLowerCase()
			return (f.label_raw.toLowerCase().includes(search) || f.info_raw.toLowerCase().includes(search) || f.value === selectedValue )
		})

		
	if(showFieldsWithEmptyValues === false && disableEmptyFields === true){
		filteredChoices = filteredChoices.filter( (f) => !f.disabled)
	}

	return (
		<>
			<SearchControl
				__nextHasNoMarginBottom
				value = {searchText}
				onChange = {setSearchText}
				label = "Field Filter"
			/>
			<MenuGroup>
				<MenuItemsChoice
					choices={ filteredChoices }
					value={ selectedValue }
					onSelect={ (v) => {
						onSelectField(v) 
					}}
				/>
			</MenuGroup>
		</>
	)
}