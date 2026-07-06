import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/timetable/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { hashKey, VALID_KEY_HASHES } from "@/lib/keys";

export const Route = createFileRoute("/activate")({
  component: ActivatePage,
  head: () => ({ meta: [{ title: "Kích hoạt ứng dụng – TKB THCS" }] }),
});

function ActivatePage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setActivated = useStore((s) => s.setActivated);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    
    if (cleanCode.length === 0) {
      toast.error("Vui lòng nhập mã kích hoạt");
      return;
    }

    setLoading(true);
    try {
      // Calculate hash of the entered key
      const hashed = await hashKey(cleanCode);
      
      if (VALID_KEY_HASHES.has(hashed)) {
        setActivated(true);
        toast.success("Kích hoạt thành công! Cảm ơn bạn đã sử dụng.");
        navigate({ to: "/" });
      } else {
        toast.error("Mã kích hoạt không hợp lệ. Vui lòng kiểm tra lại.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã xảy ra lỗi trong quá trình xác thực");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <ShieldAlert className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Kích hoạt Bản quyền</CardTitle>
          <CardDescription>
            Phần mềm đã được khóa. Vui lòng nhập mã kích hoạt 20 ký tự để tiếp tục sử dụng.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleActivate}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Mã kích hoạt (CD-Key)</Label>
              <Input
                id="code"
                placeholder="VD: AAAABBBBCCCCDDDDEEEE"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                autoComplete="off"
                className="font-mono text-center tracking-wider text-lg uppercase"
                disabled={loading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              <KeyRound className="mr-2 h-4 w-4" />
              {loading ? "Đang xác thực..." : "Kích hoạt ngay"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
