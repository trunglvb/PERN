import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';
import { INavMain } from '@/types/nav.type';
import { navMain } from '@/constants/function/menu';

interface INavMainProps {
  items: INavMain[];
}
const NavMain = (props: INavMainProps) => {
  const { pathname } = useLocation();
  const { items } = props;

  const findParentActive = navMain.find((item) => {
    if (item.items?.length! > 0) {
      return item?.items?.find((el) => el.url === pathname);
    } else {
      return item?.url === pathname;
    }
  });
  return (
    <SidebarGroup className='!pt-0'>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={true} className='group/collapsible'>
            <SidebarMenuItem>
              {item?.items?.length! > 0 ? (
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={findParentActive?.url === item.url}
                    className='!bg-transparent'
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              ) : (
                <Link to={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={item?.url === pathname}
                    className='hover:bg-red-500'
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              )}

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild isActive={subItem?.url === pathname}>
                        <Link to={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
