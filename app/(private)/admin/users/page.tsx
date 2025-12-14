import { Header } from "@/components/layout/header";
import { TopNav } from "@/components/layout/top-nav";
import { TasksProvider } from "./components/tasks-provider";
import { TasksTable } from "./components/tasks-table";
import { tasks } from './data/tasks'
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ThemeSwitch } from "@/components/theme-switch";
import { Search } from "@/components/search";
import { AppsGaleryWrapper } from "@/components/layout/apps-galery/wrapper";

export default function Taks() {
  return (
    <>
      <TasksProvider>
        {/* ===== Top Heading ===== */}
        <Header>
          <TopNav links={topNav} />
          <div className='ms-auto flex items-center space-x-4'>
            <Search />
            <ThemeSwitch />
            <AppsGaleryWrapper />
            {/* <ConfigDrawer /> */}
            <ProfileDropdown />
          </div>
        </Header>
        <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
          <div className='flex flex-wrap items-end justify-between gap-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>Tasks</h2>
              <p className='text-muted-foreground'>
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
            {/* <TasksPrimaryButtons /> */}
          </div>
          <TasksTable data={tasks} />
          {/* <TasksTable data={tasks} /> */}
        </Main>

        {/* <TasksDialogs /> */}
      </TasksProvider>
    </>
  );
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]

