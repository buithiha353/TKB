# Kế hoạch: App Thời Khóa Biểu THCS

## Tổng quan
Ứng dụng web một người dùng, chạy hoàn toàn trên trình duyệt (localStorage — không cần đăng nhập, không cần backend). Cho phép quản lý điểm trường / lớp / giáo viên / môn học, tự động sinh thời khóa biểu theo ràng buộc, và cho phép kéo-thả chỉnh sửa thủ công.

## Các trang chính

1. **Trang chủ / Dashboard** — Tổng quan số lớp, GV, môn, trạng thái TKB hiện tại. Nút "Tạo TKB tự động".
2. **Điểm trường & Lớp** — CRUD 2 điểm trường; danh sách lớp (khối 6-9) gán vào từng điểm trường.
3. **Môn học** — Danh sách môn chuẩn THCS Việt Nam kèm số tiết/tuần mặc định, cho phép chỉnh.
4. **Giáo viên** — CRUD GV: tên, các môn dạy, các lớp được phân công, điểm trường chính + điểm trường phụ (nếu có), buổi sáng nghỉ trong tuần.
5. **Thời khóa biểu** — Xem theo Lớp hoặc theo GV; grid Thứ 2–Thứ 6 × (4-5 tiết sáng + 3-4 tiết chiều); kéo-thả để đổi tiết; cảnh báo xung đột thời gian thực; nút xuất in.
6. **Cài đặt** — Số tiết sáng/chiều mỗi ngày, tên trường, xuất/nhập file JSON để sao lưu.

## Dữ liệu mẫu có sẵn
- 2 điểm trường (Điểm A, Điểm B)
- Khối 6-9, mỗi khối 2 lớp
- Môn chuẩn THCS: Toán, Ngữ văn, Tiếng Anh, KHTN, Lịch sử & Địa lí, GDCD, Công nghệ, Tin học, GDTC, Nghệ thuật (Âm nhạc + Mĩ thuật), HĐTN-HN, Nội dung địa phương.
- Số tiết/tuần theo Thông tư 32/2018 (Toán 4, Văn 4, Anh 3, KHTN 4, LS&ĐL 3, v.v.)
- ~15 GV demo với phân công môn/lớp/điểm trường/buổi nghỉ.

## Ràng buộc thuật toán tự động xếp
- Số tiết mỗi môn/lớp/tuần theo cấu hình.
- 1 GV chỉ dạy 1 lớp trong 1 tiết (không trùng).
- 1 lớp chỉ có 1 GV/môn trong 1 tiết.
- Mỗi GV có 1 buổi sáng nghỉ cố định trong tuần → không xếp tiết vào buổi đó.
- Trong 1 buổi (sáng hoặc chiều), 1 GV chỉ dạy ở 1 điểm trường duy nhất.
- Ưu tiên xếp GV tại điểm trường chính; chỉ dùng điểm trường phụ khi cần thiết.
- Không xếp 2 tiết liên tiếp cùng môn (ngoại lệ: Toán, Ngữ văn được phép ghép đôi).
- Cân đối: một môn không dồn hết vào 1-2 ngày.

## Thuật toán
Backtracking + heuristic (constraint satisfaction):
1. Sinh danh sách "yêu cầu tiết" (lớp × môn × số tiết/tuần).
2. Sắp xếp giảm dần theo độ khó (môn nhiều tiết, GV bận trước).
3. Thử đặt vào các ô (ngày, tiết) hợp lệ; nếu bí thì lùi lại.
4. Trả về TKB + danh sách xung đột chưa xếp được (nếu có) để người dùng chỉnh tay.
Chạy trong Web Worker để không đơ UI (tùy độ phức tạp, có thể chạy trực tiếp trước).

## Chỉnh tay
- Grid TKB có drag-and-drop (dnd-kit).
- Khi kéo 1 tiết sang ô khác: kiểm tra xung đột (GV trùng, GV nghỉ buổi đó, GV khác điểm trường trong cùng buổi) → hiển thị cảnh báo hoặc block.
- Nút "Hoán đổi" giữa 2 ô.
- Có thể xóa/thêm tiết tự do.

## Xuất / In
- In TKB lớp: bảng A4 ngang, mỗi lớp 1 trang.
- In TKB GV: bảng A4, mỗi GV 1 trang.
- Nút "Xuất JSON" để sao lưu; "Nhập JSON" để khôi phục.

## Chi tiết kỹ thuật
- **Stack**: TanStack Start (SPA thuần, không dùng server function), React 19, Tailwind v4, shadcn/ui.
- **Lưu trữ**: `localStorage` qua Zustand + `persist` middleware. Store chứa: schools, classes, subjects, teachers, timetable, settings.
- **Kéo-thả**: `@dnd-kit/core`.
- **Định tuyến**: các route `/`, `/schools`, `/subjects`, `/teachers`, `/timetable`, `/settings`.
- **In**: dùng `@media print` CSS thuần.
- **Ngôn ngữ**: Toàn bộ UI tiếng Việt.
- **Thiết kế**: giao diện gọn gàng chuyên nghiệp kiểu công cụ quản lý giáo dục (không sặc sỡ), màu chủ đạo xanh dương giáo dục + xám trung tính, có dark mode.

## Ngoài phạm vi (lần này)
- Đăng nhập nhiều người dùng / cloud sync.
- Nhập từ Excel (có thể thêm sau).
- Ứng dụng mobile native.
- Thông báo cho phụ huynh/học sinh.

Sau khi bạn duyệt kế hoạch, mình sẽ dựng khung dữ liệu + trang quản lý trước, rồi tới thuật toán tự động, cuối cùng là kéo-thả & in.
