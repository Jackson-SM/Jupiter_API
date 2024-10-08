import { DashboardContent } from '@/components/organisms/DashboardContent';
import { DashboardHeader } from '@/components/organisms/DashboardHeader';
import { SidebarDemo } from '@/components/organisms/SidebarDemo';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'rounded-md flex flex-col md:flex-row bg-muted dark:bg-muted w-full flex-1 mx-auto border border-border dark:border-border overflow-hidden',
        'h-screen', // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <SidebarDemo />
      <DashboardContent>
        <DashboardHeader />
        {children}
      </DashboardContent>
    </div>
  );
}
