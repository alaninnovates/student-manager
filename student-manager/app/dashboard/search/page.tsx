'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { useState } from 'react';

interface Student {
    id: string;
    name: string;
    avatarUrl?: string;
    joinDate: Date;
    status: 'active' | 'inactive';
}

const students: Student[] = [
    {
        id: '1',
        name: 'John Doe',
        joinDate: new Date('2025-01-15'),
        status: 'active',
    },
    {
        id: '2',
        name: 'Jane Smith',
        joinDate: new Date('2024-11-20'),
        status: 'inactive',
    },
    {
        id: '3',
        name: 'Alice Johnson',
        joinDate: new Date('2024-08-10'),
        status: 'active',
    },
    {
        id: '4',
        name: 'Bob Brown',
        joinDate: new Date('2024-06-05'),
        status: 'inactive',
    },
    {
        id: '5',
        name: 'Charlie White',
        joinDate: new Date('2025-02-25'),
        status: 'active',
    },
];

export default function Search() {
    const [query, setQuery] = useState('');

    return (
        <div className="flex flex-col min-h-screen w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Search Students</h1>
            <div className="flex flex-row gap-4 items-center">
                <Input
                    type="text"
                    placeholder="Search for students..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button onClick={() => console.log('asdf')}>Search</Button>
            </div>
            <div className="mt-6 space-y-4">
                {students.map((student) => (
                    <div
                        key={student.id}
                        className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-4"
                    >
                        <Avatar className="h-12 w-12">
                            <div className="bg-gray-200 h-full w-full flex items-center justify-center text-lg text-gray-600">
                                {student.name.charAt(0)}
                            </div>
                        </Avatar>
                        <div>
                            <h2 className="text-lg font-semibold">
                                {student.name}
                            </h2>
                            <p>
                                Join Date:{' '}
                                {student.joinDate.toLocaleDateString()}
                            </p>
                            <p className="flex items-center gap-2">
                                Status:
                                <span
                                    className={`inline-block w-2 h-2 rounded-full ${
                                        student.status === 'active'
                                            ? 'bg-green-500'
                                            : 'bg-amber-500'
                                    }`}
                                ></span>
                                {student.status}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
