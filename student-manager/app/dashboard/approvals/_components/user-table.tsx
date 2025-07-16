import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { UserTableActions } from './user-table-actions';

const censorEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) return email;
    const censoredLocalPart = localPart[0] + '*'.repeat(localPart.length - 2);
    return `${censoredLocalPart}@${domain}`;
};

export const UserTable = ({
    users,
    filter,
    actionsEnabled,
}: {
    users: {
        id: string;
        created_at: string;
        email: string;
        approved: boolean;
        admin: boolean;
    }[];
    filter: 'awaitingApproval' | 'admin' | 'all';
    actionsEnabled: boolean;
}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Status</TableHead>
                    {actionsEnabled && <TableHead>Actions</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {users
                    .filter((user) => {
                        if (filter === 'all') return true;
                        if (filter === 'awaitingApproval') {
                            return !user.approved && !user.admin;
                        }
                        if (filter === 'admin') {
                            return user.admin;
                        }
                        return false;
                    })
                    .map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                {actionsEnabled
                                    ? user.email
                                    : censorEmail(user.email)}
                            </TableCell>
                            <TableCell>
                                {new Date(user.created_at).toLocaleString()}
                            </TableCell>
                            <TableCell>
                                {user.admin
                                    ? 'Admin'
                                    : user.approved
                                    ? 'Approved'
                                    : 'Awaiting Approval'}
                            </TableCell>
                            {actionsEnabled && (
                                <TableCell>
                                    <UserTableActions user={user} />
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
};
