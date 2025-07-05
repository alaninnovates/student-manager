import React from 'react';

export const DateFilter: React.FC<{
    onChange: (value: string) => void;
    defaultValue?: string;
    name: string;
    text?: string;
}> = ({ onChange, defaultValue, name, text }) => {
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="flex items-center gap-2">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {text}
            </label>
            <input
                type="date"
                id={name}
                name={name}
                defaultValue={defaultValue}
                onChange={handleDateChange}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
    );
};
