# Hệ Thống Quản Lý và Xếp Thời Khóa Biểu THCS (TKB THCS)

Ứng dụng web chuyên dụng giúp các trường Trung học cơ sở quản lý thông tin nhà trường, phân công chuyên môn và tự động xếp thời khóa biểu (TKB) dựa trên các ràng buộc thực tế.

## 🌟 Tính Năng Nổi Bật

- **Quản lý danh mục cốt lõi**: Điểm trường, Lớp học, Môn học, Giáo viên.
- **Phân công chuyên môn**: Dễ dàng phân công giáo viên giảng dạy các môn cho từng lớp.
- **Sinh TKB Tự Động**: Thuật toán thông minh tự động xếp TKB thỏa mãn các ràng buộc khắt khe:
  - Giáo viên được nghỉ ít nhất 1 buổi sáng hoặc chiều trong tuần.
  - Không xếp giáo viên dạy ở 2 điểm trường khác nhau trong cùng một buổi.
  - Không xếp 2 tiết cùng một môn học liên tiếp nhau (ngoại trừ môn Toán và Ngữ Văn).
- **Trình chỉnh sửa TKB Trực Quan (Kéo-Thả)**: Sau khi sinh TKB, người dùng có thể tinh chỉnh lại bằng thao tác kéo-thả (Drag & Drop). Hệ thống sẽ tự động kiểm tra và cảnh báo nếu có xung đột (Conflict Checking).
- **Chế độ xem linh hoạt**: Xem TKB theo từng Lớp học hoặc theo từng Giáo viên.
- **Hỗ trợ in ấn**: Giao diện được tối ưu hóa cho việc in thời khóa biểu trực tiếp từ trình duyệt.

## 💻 Công Nghệ Sử Dụng (Tech Stack)

Dự án được xây dựng trên nền tảng các công nghệ web hiện đại, tối ưu hiệu suất và trải nghiệm người dùng:

- **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router/latest)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Lưu trữ trạng thái toàn cục gọn nhẹ)
- **Styling & UI Components**: 
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - [Shadcn UI](https://ui.shadcn.com/) (Dựa trên Radix UI)
  - [Lucide React](https://lucide.dev/) (Biểu tượng)
- **Tính năng Kéo thả (Drag & Drop)**: [@dnd-kit/core](https://dndkit.com/)

## 🚀 Hướng Dẫn Cài Đặt và Chạy Chạy Nội Bộ (Local Development)

### Yêu cầu hệ thống
- Node.js (phiên bản 18+ trở lên)
- npm hoặc bun / yarn / pnpm

### Các bước cài đặt

1. **Clone repository**:
   ```bash
   git clone https://github.com/buithiha353/TKB.git
   cd TKB
   ```

2. **Cài đặt các gói phụ thuộc (dependencies)**:
   ```bash
   npm install
   ```

3. **Chạy server phát triển (Development Server)**:
   ```bash
   npm run dev
   ```
   Sau khi chạy lệnh trên, hãy mở trình duyệt và truy cập vào `http://localhost:5173`.

4. **Build cho môi trường Production**:
   ```bash
   npm run build
   ```

## 📝 Cấu trúc thư mục chính

- `src/components/`: Chứa các component dùng chung (gồm cả Shadcn UI).
- `src/routes/`: Các trang (pages) của ứng dụng theo kiến trúc TanStack Router.
- `src/lib/timetable/`: Chứa logic cốt lõi về thuật toán xếp lịch (`scheduler.ts`) và quản lý state (`store.ts`).

---
*Dự án được khởi tạo và phát triển nhằm mục đích số hóa và tự động hóa công tác xếp TKB tại các trường THCS.*
