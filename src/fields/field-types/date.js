import FieldType from "./field"

import {isMatch, parse} from "date-fns"

const MYSQL_DATE_FORMAT = "yyyy-MM-dd"

export default class DateField extends FieldType {

	static slug = "date"

	constructor(...args) {
		super(...args);
	}

	value( value = null){

		
		if(!value){
			return null
		}

		let dateValue

		if(  isMatch(value, MYSQL_DATE_FORMAT ) ) {
			dateValue = parse(value, MYSQL_DATE_FORMAT.replace("-", "'-'"), new Date() )
			return dateValue
		}

		
		try{
			dateValue = new Date(value)
		} catch {
			return null
		}
			

		if(!(dateValue instanceof Date)){
			return null
		}

		
		
		return dateValue
	}
}

