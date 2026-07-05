import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/timetable/store";
import { DAY_NAMES } from "@/lib/timetable/types";
import { getPeriodsList } from "@/lib/timetable/scheduler";
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/print-all")({
  component: PrintAllPage,
  head: () => ({ meta: [{ title: "In TKB Toàn Trường" }] }),
});

function PrintAllPage() {
  const { settings, classes, schools, subjects, teachers, timetable } = useStore();

  const subjectMap = new Map(subjects.map((s) => [s.id, s]));
  const teacherMap = new Map(teachers.map((t) => [t.id, t]));
  const periodsList = getPeriodsList(settings);

  const branch2Id = schools.length > 1 ? schools[1].id : null;

  const group1 = useMemo(
    () => classes.filter((c) => c.grade === 6 || c.grade === 7).sort((a, b) => a.name.localeCompare(b.name)),
    [classes]
  );
  const group2 = useMemo(
    () => classes.filter((c) => c.grade === 8 || c.grade === 9).sort((a, b) => a.name.localeCompare(b.name)),
    [classes]
  );

  useEffect(() => {
    // Automatically trigger print dialog when loaded
    const timeout = setTimeout(() => {
      window.print();
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const renderTable = (group: typeof classes) => {
    return (
      <div className="w-full">
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold">{settings.schoolName}</h1>
          <h2 className="text-2xl font-extrabold uppercase mt-1">Thời Khóa Biểu Toàn Trường</h2>
        </div>

        <table className="w-full border-collapse border border-black text-sm">
          <thead>
            <tr>
              <th className="border border-black p-1">Thứ</th>
              <th className="border border-black p-1">Buổi</th>
              <th className="border border-black p-1">Tiết</th>
              {group.map((c) => (
                <th
                  key={c.id}
                  className={cn(
                    "border border-black p-1 w-24",
                    c.schoolId === branch2Id && "bg-[#FFFFCC]"
                  )}
                >
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: settings.days }).map((_, d) => {
              const dayName = DAY_NAMES[d];
              const totalPeriodsPerDay = settings.periodsPerMorning + settings.periodsPerAfternoon;

              return periodsList.map((p, pIdx) => {
                return (
                  <tr key={`${d}-${p.session}-${p.period}`}>
                    {/* Render 'Thứ' cell once per day */}
                    {pIdx === 0 && (
                      <td
                        rowSpan={totalPeriodsPerDay}
                        className="border border-black p-1 text-center font-bold align-middle whitespace-nowrap"
                      >
                        {dayName}
                      </td>
                    )}

                    {/* Render 'Sáng/Chiều' cell once per session */}
                    {p.period === 1 && (
                      <td
                        rowSpan={p.session === "AM" ? settings.periodsPerMorning : settings.periodsPerAfternoon}
                        className="border border-black p-1 text-center font-bold align-middle"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        {p.session === "AM" ? "Sáng" : "Chiều"}
                      </td>
                    )}

                    <td className="border border-black p-1 text-center font-medium">
                      {p.period}
                    </td>

                    {/* Render cells for each class */}
                    {group.map((c) => {
                      const lesson = timetable[c.id]?.[d]?.[p.session]?.[p.period];
                      const sub = lesson ? subjectMap.get(lesson.subjectId) : null;
                      const teacher = lesson ? teacherMap.get(lesson.teacherId) : null;

                      return (
                        <td
                          key={c.id}
                          className={cn(
                            "border border-black p-1 text-center",
                            c.schoolId === branch2Id && "bg-[#FFFFCC]"
                          )}
                        >
                          {lesson ? (
                            <div className="flex flex-col items-center justify-center leading-tight">
                              <span className="font-bold">{sub?.shortName}</span>
                              <span className="text-[10px] text-muted-foreground">{teacher?.name}</span>
                            </div>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8 font-sans">
      <div className="mb-4 flex gap-2 print:hidden">
        <Button variant="outline" onClick={() => window.close()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Đóng
        </Button>
        <Button onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" /> In TKB
        </Button>
      </div>

      <div className="print-container space-y-12">
        {/* Page 1: Grade 6, 7 */}
        <div className="print:page-break-after-always print:h-screen print:w-screen print:flex print:flex-col print:justify-center overflow-x-auto pb-8 print:pb-0">
          {renderTable(group1)}
        </div>

        {/* Page 2: Grade 8, 9 */}
        <div className="print:h-screen print:w-screen print:flex print:flex-col print:justify-center overflow-x-auto pb-8 print:pb-0">
          {renderTable(group2)}
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 10mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
