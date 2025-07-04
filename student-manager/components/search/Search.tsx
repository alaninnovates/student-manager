// https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
'use client';

import { Search as SearchIcon } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { DateFilter } from './filters/DateFilter';
import { LimitFilter } from './filters/LimitFilter';

const allFilters = {
    date: {
        name: 'date',
        component: DateFilter,
    },
    limit: {
        name: 'limit',
        component: LimitFilter,
    },
};

export default function Search({
    placeholder,
    filters = [],
}: {
    placeholder: string;
    filters?: { name: keyof typeof allFilters; id: string; text: string }[];
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [showFilters, setShowFilters] = React.useState(false);

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handleFilterChange = (filterName: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(filterName, value);
        } else {
            params.delete(filterName);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="relative flex flex-1 flex-shrink-0 flex-col gap-2">
            <div className="relative flex w-full">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    placeholder={placeholder}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get('query')?.toString()}
                />
                <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                {filters.length > 0 && (
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-sm"
                        aria-label="Toggle filters"
                    >
                        <div className="flex flex-col gap-1">
                            <div className="w-5 h-0.5 bg-gray-500"></div>
                            <div className="w-5 h-0.5 bg-gray-500"></div>
                            <div className="w-5 h-0.5 bg-gray-500"></div>
                        </div>
                    </button>
                )}
            </div>

            {showFilters && filters.length > 0 && (
                <div className="grid grid-cols-3 gap-3 p-3 border rounded-md">
                    {filters.map((filter) => {
                        const FilterComponent =
                            allFilters[filter.name]?.component;
                        return FilterComponent ? (
                            <div key={filter.id} className="flex flex-col">
                                <FilterComponent
                                    onChange={(value) =>
                                        handleFilterChange(filter.id, value)
                                    }
                                    defaultValue={
                                        searchParams.get(filter.id) || ''
                                    }
                                    name={filter.name}
                                    text={filter.text}
                                />
                            </div>
                        ) : null;
                    })}
                </div>
            )}
        </div>
    );
}
