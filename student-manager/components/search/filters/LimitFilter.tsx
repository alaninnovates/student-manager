import React from 'react';

const options = [10, 25, 50, 100];

export const LimitFilter: React.FC<{
    onChange: (value: string) => void;
    defaultValue?: string;
    name: string;
    text?: string;
}> = ({ onChange, defaultValue, name, text }) => {
    const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };
    return (
        <div className="flex items-center gap-2">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {text || 'Limit'}
            </label>
            <select
                id={name}
                name={name}
                defaultValue={defaultValue}
                onChange={handleLimitChange}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm focus:border-blue-500 focus:ring-blue-500"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};
