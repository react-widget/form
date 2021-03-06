import React from "react";

export interface NativeFieldProps extends Omit<React.HTMLAttributes<any>, "onChange"> {
	component?: React.ElementType<any>;
	value?: any;
	inputRef?: (ref: React.ReactInstance) => void;
	onChange?: (value: any, e: React.SyntheticEvent) => void;
	[x: string]: any;
}

export function NativeField(props: NativeFieldProps) {
	const { component: Component = "input", value, inputRef, onChange, ...others } = props;

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		onChange && onChange(value, e);
	};

	return <Component ref={inputRef} onChange={onInputChange} value={value} {...others} />;
}

export default NativeField;
