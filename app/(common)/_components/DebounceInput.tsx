'use client'

import { useEffect, useState } from 'react';

type DebouncedInputProps = {
    onChange: (value: string | number) => void;
    debounce?: number;
	defaultValue?: string;
    [key: string]: any;
};

export default function DebouncedInput(props: DebouncedInputProps) {
    const { onChange, debounce = 500, defaultValue, ...rest } = props;
    const [ value, setValue ] = useState(defaultValue ?? '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
		<div className={"relative"}>
			<input
				{ ...rest }
				value={ value }
				onChange={ (e) => setValue(e.target.value) }
                className="p-2 text-gray-700 outline-none w-64"
			/>
		</div>
	);
};
