import Moment from "moment"
import {format, isMatch} from "date-fns"
import clsx from "clsx"
import styled from '@emotion/styled';
import InputMask from '@mona-health/react-input-mask';
import {isEmpty} from "lodash"

import {useState, forwardRef} from "@wordpress/element"
import { useInstanceId } from '@wordpress/compose';
import { useEntityProp } from '@wordpress/core-data';

import { dateI18n, getSettings } from "@wordpress/date"
import { __experimentalHStack as HStack, Dropdown, Button, DatePicker, BaseControl} from "@wordpress/components"


import {calendar as calendarIcon} from "@wordpress/icons"

const MYSQL_DATE_FORMAT = "yyyy-MM-dd"

const WideHStack = styled( HStack )`
	width: 100%
`;

const getSiteDefaultDateFormat = () => {
	// Get the generic date settings and the site specific date settings. 
	// Use the root.site.date_format, Unless it doesn't exist. 
	// Fallback to the default in wpDateSettings.
	const wpDateSettings = getSettings();
	const [ siteFormat = wpDateSettings.formats.date ] = useEntityProp( 'root', 'site', 'date_format');

	return siteFormat
}

const DateTimeDropdown = ({value, onChange, dropdownProps}) => {
	console.log("dropdownProps", dropdownProps)
	return (
		<Dropdown
			{...dropdownProps}
			renderToggle={ ( { isOpen, onToggle } ) => (
				<Button
					onClick={ onToggle }
					aria-expanded={ isOpen }
					icon = {calendarIcon}
					variant = "secondary"
					size = "compact"
					__next40pxDefaultSize
				/>
			) }
			renderContent={ ( { onClose } ) => (
				<DatePicker
					currentDate={ value }
					onChange={ ( newDate ) => {
						const formattedDate = format(newDate, MYSQL_DATE_FORMAT)
						onChange?.(formattedDate)
						onClose();
					} }
					onClose={ onClose }
				/>
			) }
		/>
	);
};

export const UnforwardedDateControl = ( 
	props,
	ref
) => {

	const {
		label,
		hideLabelFromVision,
		value = null,
		help,
		className,
		onChange,
		type = 'text',
		isValid,
		isTouched,
		maskProps = {},
		...additionalProps
	} = props;


	const instanceId = useInstanceId( MaskedDateControl );
	const id = `inspector-text-control-${ instanceId }`;
	const [ date, setDate ] = useState( !isEmpty(value) ? new Date(value) : new Date() );

	const [ isDatePickerOpen, setIsDatePickerOpen ] = useState( false );
	console.log("isDatePickerOpen", isDatePickerOpen)
	
	console.log("date val", value, isMatch(value, MYSQL_DATE_FORMAT.replace("-", "'-'") , new Date() ) )
	const inputValue = isEmpty(value) ? "" : format(value, "MM/dd/yyyy")
	/**
	 * The Field Must Display a consistent value in the date picker and the masked text field
	 * possible values are a date string formatted for output, an empty string, null, or undefined
	 * 
	 * The inital load will receive one of "", null, undefined, yyyy-MM-dd
	 * if the picker has been updated a date object may be available via useState(), if no other value is available this will be today
	 */

	const onChangeValue = ( newDate ) => {
		const formattedDate = format(newDate, MYSQL_DATE_FORMAT)
		setDate(newDate)
		onChange( formattedDate );
	}

	const inputBaseClassName = 'components-text-control__input'
	const inputClassName = clsx(
		inputBaseClassName,
		{
			[`${inputBaseClassName}--invalid`]: (!isValid && isTouched)
		}
	)

	return (
		<BaseControl
			__nextHasNoMarginBottom = {true}
			__next40pxDefaultSize
			label={ label }
			hideLabelFromVision={ hideLabelFromVision }
			id={ id }
			help={ help }
			className={ className }
		>
			<WideHStack>
				 <InputMask
					className={inputClassName}
					type={ type }
					id={ id }
					value={ inputValue }
					onChange={ onChangeValue }
					aria-describedby={ !! help ? id + '__help' : undefined }
					ref={ ref }
					{ ...maskProps }
					{ ...additionalProps }
					onFocus = { (event) => {
						setIsDatePickerOpen(true)
					}}
				/>
				<DateTimeDropdown 
					dropdownProps = {{
						open : isDatePickerOpen,
						onToggle : setIsDatePickerOpen
					}}
					
					value = {date}
					onChange = { (date) => {
						onChangeValue(date)
					}}
				/>
			</WideHStack>
		</BaseControl>
	)
	
	/*

	return (
		<>
			<span>{ props.label }</span>
		
			<Dropdown
				renderToggle={ ( { isOpen, onToggle } ) => (
					<Button
						onClick={ onToggle }
						aria-expanded={ isOpen }
						variant="tertiary"
					>
						{dateI18n(settings.formats.date, date)}
					</Button>
				) }
				renderContent={ ( { onClose } ) => (
					<DatePicker
						currentDate={ date }
						onChange={ ( newDate ) => setDate( newDate ) }
						onClose={ onClose }
					/>
				) }
			/>

		</>
    )
	*/
}
export const MaskedDateControl = forwardRef( UnforwardedDateControl );




export default MaskedDateControl;