import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/timetable/store";
import { SetupWizard } from "@/components/SetupWizard";
import {
  Calendar,
  GraduationCap,
  Home,
  School as SchoolIcon,
  Settings as SettingsIcon,
  Users,
  BookOpen,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth/store";
import { useRouter } from "@tanstack/react-router";

const nav = [
  { to: "/", label: "Tổng quan", icon: Home },
  { to: "/schools", label: "Điểm trường & Lớp", icon: SchoolIcon },
  { to: "/subjects", label: "Môn học", icon: BookOpen },
  { to: "/teachers", label: "Giáo viên", icon: Users },
  { to: "/assignments", label: "Phân công", icon: GraduationCap },
  { to: "/timetable", label: "Thời khóa biểu", icon: Calendar },
  { to: "/settings", label: "Cài đặt", icon: SettingsIcon },
] as const;

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onboarded = useStore((s) => s.onboarded);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Đảm bảo chỉ mở wizard sau khi Zustand đã load xong localStorage
    useStore.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useStore.persist.hasHydrated());
  }, []);

  useEffect(() => {
    if (hydrated && !onboarded) {
      setWizardOpen(true);
    }
  }, [hydrated, onboarded]);
  return (
    <div className="min-h-screen bg-muted/30 print:bg-white">
      <SetupWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 border-r bg-card md:flex md:flex-col print:hidden">
          <div className="border-b px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">TKB THCS</div>
                <div className="text-xs text-muted-foreground">Xếp thời khóa biểu</div>
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {nav.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t p-3">
            <button
              onClick={() => {
                logout();
                router.navigate({ to: "/login" });
              }}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </button>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-card/95 px-4 py-3 backdrop-blur md:hidden print:hidden">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="font-semibold">TKB THCS</span>
            </div>
            <button
              onClick={() => {
                logout();
                router.navigate({ to: "/login" });
              }}
              className="p-1 text-red-500 active:bg-red-50 rounded-md"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </header>
          {/* Mobile bottom nav */}
          <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t bg-card/95 backdrop-blur md:hidden print:hidden">
            {nav.slice(0, 6).map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 py-2 text-[10px]",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="truncate">{item.label.split(" ")[0]}</span>
                </Link>
              );
            })}
          </nav>

          <main className="mx-auto max-w-7xl p-4 pb-24 md:p-8 md:pb-8 print:p-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}