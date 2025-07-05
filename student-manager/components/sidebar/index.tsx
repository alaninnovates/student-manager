'use client';
import { SidebarAppInfo } from '@/components/sidebar/sidebar-app-info';
import {
    Sidebar as CNSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { routes } from '@/lib/routes';
import { usePathname } from 'next/navigation';
import { SidebarAccountInfo } from './sidebar-account-info';

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <CNSidebar>
            <SidebarHeader>
                <SidebarAppInfo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {routes.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                    >
                                        <a href={item.url}>{item.title}</a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarAccountInfo />
            </SidebarFooter>
            <SidebarRail />
        </CNSidebar>
    );
};
