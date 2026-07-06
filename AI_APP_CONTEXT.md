# Ngữ cảnh ứng dụng TKB THCS cho AI

Tài liệu này là điểm đọc nhanh cho các trợ lý AI khi cần hiểu dự án mà không phải quét toàn bộ mã nguồn. Nội dung phản ánh kiến trúc desktop/offline hiện tại của ứng dụng.

## Mục tiêu ứng dụng

TKB THCS là ứng dụng lập thời khóa biểu cho trường THCS. Ứng dụng tập trung vào dữ liệu nội bộ của nhà trường: điểm trường, lớp học, môn học, giáo viên, phân công dạy và sinh thời khóa biểu tự động. Phiên bản desktop được định hướng chạy offline, lưu dữ liệu cục bộ trong trình duyệt WebView/Tauri và hỗ trợ xuất/nhập file để sao lưu hoặc chuyển dữ liệu.

## Kiến trúc tổng quan

- Frontend dùng React, TanStack Router, Zustand, Tailwind CSS và bộ component Radix/shadcn.
- Desktop dùng Tauri 2, build giao diện bằng Vite riêng qua `vite.desktop.config.ts`.
- Entry desktop là `desktop/index.html` và `desktop/src/main.tsx`.
- App web/SSR vẫn giữ shell TanStack Start ở `src/routes/__root.tsx`, nhưng khi `VITE_DESKTOP === "true"` thì bỏ lớp `<html><body>` để tránh lỗi DOM lồng body trong desktop.
- Dữ liệu nghiệp vụ chính nằm trong Zustand store tại `src/lib/timetable/store.ts`.
- Các thuật toán lập lịch nằm trong `src/lib/timetable/`.
- Xuất/nhập Excel dùng `exceljs`; desktop dùng plugin Tauri dialog/fs để mở popup chọn file.

## Các màn hình chính

- `src/routes/index.tsx`: Tổng quan, thống kê nhanh và điểm bắt đầu sinh thời khóa biểu.
- `src/routes/schools.tsx`: Quản lý điểm trường và lớp học. Có thêm lớp thủ công, tải file mẫu Excel, nhập lớp từ Excel.
- `src/routes/subjects.tsx`: Quản lý môn học, tên rút gọn và số tiết mặc định.
- `src/routes/teachers.tsx`: Quản lý giáo viên, môn dạy, lớp dạy, điểm trường và ngày nghỉ. Có tải file mẫu Excel và nhập giáo viên từ Excel.
- `src/routes/assignments.tsx`: Chỉnh số tiết sáng/chiều theo phân công. Có nút “Áp dụng toàn khối” để copy số tiết của một môn sang các lớp cùng khối.
- `src/routes/timetable.tsx`: Xem thời khóa biểu, sinh lịch tự động và xuất Excel.
- `src/routes/settings.tsx`: Cấu hình số ngày/tuần, số tiết sáng/chiều, dữ liệu mẫu, nhập/xuất JSON.

## Mô hình dữ liệu chính

Các kiểu dữ liệu nằm tại `src/lib/timetable/types.ts`.

- `School`: điểm trường.
- `SchoolClass`: lớp học, gồm tên lớp, khối 6-9 và điểm trường.
- `Subject`: môn học, gồm tên đầy đủ, tên ngắn và số tiết mặc định.
- `Teacher`: giáo viên, gồm môn dạy, điểm trường, ngày nghỉ và trạng thái nghỉ cả ngày.
- `Assignment`: phân công giáo viên dạy môn/lớp, gồm số tiết sáng và chiều.
- `TimetableEntry`: một tiết đã được xếp vào lịch.

## Luồng dữ liệu và lưu trữ

- Store Zustand tự lưu vào local storage thông qua persist.
- App desktop không cần Supabase hay backend cho nhu cầu hiện tại.
- Sao lưu/chuyển máy bằng JSON trong phần Cài đặt.
- Dữ liệu lớp và giáo viên có thể nhập nhanh từ Excel.
- Kết quả thời khóa biểu có thể xuất Excel qua popup chọn nơi lưu file.

## Nhập Excel lớp học

Màn hình: `Điểm trường & Lớp học`.

File mẫu được tạo bằng nút `Mẫu Excel`. Sheet đầu tiên dùng các cột:

1. `Tên lớp`
2. `Khối`
3. `Điểm trường`

Khi nhập:

- Bỏ qua dòng tiêu đề.
- Chỉ nhận khối 6, 7, 8, 9.
- Bỏ qua lớp trùng tên.
- Nếu điểm trường chưa tồn tại thì tự tạo điểm trường mới.

## Nhập Excel giáo viên

Màn hình: `Giáo viên`.

File mẫu được tạo bằng nút `Mẫu Excel`. Sheet đầu tiên dùng các cột:

1. `Họ và tên`
2. `Môn dạy`
3. `Lớp dạy`
4. `Điểm trường`
5. `Ngày nghỉ`
6. `Nghỉ cả ngày`

Quy ước:

- Nhiều môn/lớp/điểm trường cách nhau bằng dấu `;` hoặc `,`.
- Môn có thể khớp theo tên đầy đủ hoặc tên ngắn.
- Ngày nghỉ có thể nhập kiểu `Thứ 2`, `Thứ 3`, ... hoặc số.
- `Nghỉ cả ngày` nhận các giá trị kiểu `Có`, `Yes`, `True`, `1`, `X`.
- Khi nhập giáo viên, app tự tạo phân công cho các cặp lớp/môn hợp lệ.

## Áp dụng toàn khối trong phân công

Màn hình: `Phân công`.

Nút `Toàn khối` trên từng dòng sẽ lấy số tiết sáng/chiều của dòng hiện tại và áp dụng cho các phân công khác có:

- Cùng môn học.
- Lớp thuộc cùng khối.

Tính năng này dùng để nhanh chóng đồng bộ số tiết của một môn trên toàn bộ khối.

## Xuất Excel

Helper chung nằm tại `src/lib/timetable/excelFiles.ts`.

- Web: tải file bằng `file-saver`.
- Desktop: mở popup chọn nơi lưu bằng `@tauri-apps/plugin-dialog`, sau đó ghi file bằng `@tauri-apps/plugin-fs`.

File xuất thời khóa biểu chính nằm tại `src/lib/timetable/exportExcel.ts`.

## Desktop/Tauri

Các file quan trọng:

- `src-tauri/tauri.conf.json`: tên app, version, icon, bundle NSIS, updater endpoint.
- `src-tauri/Cargo.toml`: version Rust package và dependency Tauri/plugin.
- `src-tauri/src/lib.rs`: khởi tạo Tauri, dialog, fs, updater và focus window.
- `src-tauri/capabilities/default.json`: quyền dialog, fs, updater.
- `src-tauri/icons/`: icon app, shortcut và installer.

Lệnh thường dùng:

```bash
npm run desktop:web:build
npm run desktop:build
```

File cài đặt Windows sau build nằm trong:

```text
src-tauri/target/release/bundle/nsis/
```

## Auto update

App đã cấu hình updater Tauri trỏ về:

```text
https://raw.githubusercontent.com/buithiha353/TKB/main/updates/latest.json
```

Khi phát hành bản mới cần:

1. Build installer/bundle mới.
2. Tạo GitHub Release chứa asset cài đặt và chữ ký nếu dùng updater ký số.
3. Cập nhật `updates/latest.json` theo version mới, URL asset và signature tương ứng.

## Build và kiểm tra

Các bước kiểm tra tối thiểu sau khi sửa:

```bash
npx tsc --noEmit
cd src-tauri
cargo check
cd ..
npm run desktop:build
```

## Lưu ý kỹ thuật quan trọng

- Không đưa `<html>` hoặc `<body>` vào trong cây React desktop. Desktop đã có `desktop/index.html`.
- Tránh ép `pointer-events: auto !important` lên `html/body/#root` vì có thể phá Radix Dialog/Focus Trap.
- Với desktop, thao tác file nên đi qua Tauri dialog/fs để người dùng chọn vị trí rõ ràng.
- Nếu thay icon mà shortcut Windows vẫn hiện icon cũ, có thể là do cache icon của Windows hoặc shortcut cũ chưa được tạo lại sau khi cài bản mới.
