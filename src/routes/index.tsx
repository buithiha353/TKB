import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/timetable/store";
import { generateSchedule } from "@/lib/timetable/scheduler";
import { toast } from "sonner";
import { BookOpen, Calendar, School, Users, Sparkles, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const { schools, classes, subjects, teachers, assignments, timetable, settings, setTimetable } =
    useStore();

  const totalLessons = Object.keys(timetable).length;
  const totalNeeded = assignments.reduce(
    (s, a) => s + (a.morningPeriods || 0) + (a.afternoonPeriods || 0),
    0,
  );

  const handleGenerate = () => {
    const t0 = performance.now();
    const res = generateSchedule({
      settings,
      classes,
      subjects,
      teachers,
      assignments,
    });
    setTimetable(res.timetable);
    const ms = Math.round(performance.now() - t0);
    if (res.unplaced.length === 0) {
      toast.success(`Đã xếp ${res.totalPlaced}/${res.totalNeeded} tiết trong ${ms}ms`);
    } else {
      toast.warning(
        `Xếp được ${res.totalPlaced}/${res.totalNeeded} tiết. Còn ${
          res.totalNeeded - res.totalPlaced
        } tiết chưa xếp – hãy chỉnh thủ công.`,
      );
    }
  };

  const stats = [
    {
      label: "Điểm trường",
      value: schools.length,
      icon: School,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      label: "Lớp học",
      value: classes.length,
      icon: GraduationCap,
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      label: "Môn học",
      value: subjects.length,
      icon: BookOpen,
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      label: "Giáo viên",
      value: teachers.length,
      icon: Users,
      color: "bg-violet-500/10 text-violet-600",
    },
  ];

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Tổng quan</h1>
        <p className="mt-1 text-sm text-muted-foreground">{settings.schoolName}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className={`mb-2 grid h-9 w-9 place-items-center rounded-lg ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Tạo thời khóa biểu tự động
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Thuật toán sẽ xếp {totalNeeded} tiết cho {classes.length} lớp theo các ràng buộc: mỗi
              GV nghỉ 1 buổi sáng/tuần, không di chuyển giữa 2 điểm trường trong cùng buổi, không
              xếp 2 tiết liên tiếp cùng môn (trừ Toán/Văn), ưu tiên điểm trường chính.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleGenerate} size="lg">
                <Sparkles className="mr-2 h-4 w-4" />
                Sinh TKB tự động
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/timetable">
                  <Calendar className="mr-2 h-4 w-4" />
                  Xem thời khóa biểu
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trạng thái</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Đã xếp</span>
              <span className="font-semibold">{totalLessons} tiết</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cần xếp</span>
              <span className="font-semibold">{totalNeeded} tiết</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phân công</span>
              <span className="font-semibold">{assignments.length}</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all"
                style={{
                  width: totalNeeded
                    ? `${Math.min(100, (totalLessons / totalNeeded) * 100)}%`
                    : "0%",
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bắt đầu nhanh</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              1. Kiểm tra{" "}
              <Link to="/schools" className="text-primary underline">
                điểm trường & lớp học
              </Link>
            </p>
            <p>
              2. Xem{" "}
              <Link to="/subjects" className="text-primary underline">
                môn học
              </Link>{" "}
              và số tiết/tuần
            </p>
            <p>
              3. Cập nhật{" "}
              <Link to="/teachers" className="text-primary underline">
                danh sách giáo viên
              </Link>
            </p>
            <p>
              4. Kiểm tra{" "}
              <Link to="/assignments" className="text-primary underline">
                phân công dạy
              </Link>
            </p>
            <p>
              5. Bấm "Sinh TKB tự động" và{" "}
              <Link to="/timetable" className="text-primary underline">
                tinh chỉnh
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cấu hình hiện tại</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <div>
              <span className="text-muted-foreground">Số ngày/tuần:</span> {settings.days}
            </div>
            <div>
              <span className="text-muted-foreground">Tiết buổi sáng:</span>{" "}
              {settings.morningPeriods}
            </div>
            <div>
              <span className="text-muted-foreground">Tiết buổi chiều:</span>{" "}
              {settings.afternoonPeriods}
            </div>
            <div>
              <span className="text-muted-foreground">Tổng slot/tuần:</span>{" "}
              {(settings.morningPeriods + settings.afternoonPeriods) * settings.days}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
