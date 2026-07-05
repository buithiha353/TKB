# Tự Động Cập Nhật

Ứng dụng desktop Windows dùng Tauri v2. Cơ chế updater của Tauri sẽ kiểm tra file manifest public, so sánh version, tải installer mới, xác minh chữ ký, rồi cài đặt bản cập nhật.

## Nơi Lưu Bản Cập Nhật

Dùng chính repo GitHub hiện tại:

```text
https://github.com/buithiha353/TKB
```

Endpoint manifest đang cấu hình trong `src-tauri/tauri.conf.json`:

```text
https://cdn.jsdelivr.net/gh/buithiha353/TKB@main/updates/latest.json
```

Installer và file `.sig` nên lưu trong GitHub Releases của repo này.

## Trạng Thái Tích Hợp

- Đã cài `@tauri-apps/plugin-updater` và `@tauri-apps/plugin-process`.
- Đã đăng ký Rust plugin trong `src-tauri/src/lib.rs`.
- Đã bật quyền updater/process trong `src-tauri/capabilities/default.json`.
- Trang Cài đặt có nút kiểm tra cập nhật, chỉ hiện trong bản desktop.
- Public key đã nằm trong `src-tauri/tauri.conf.json`.
- Private key nằm trong `.tauri/tkb-thcs.key` và đã được ignore khỏi git.
- Đã tạo `updates/latest.json` làm manifest public cho updater.

## Lưu Ý Quan Trọng

File `updates/latest.json` hiện là khung cho version `0.1.0`. Khi có release thật, phải thay:

- `version`
- `notes`
- `pub_date`
- `signature`
- `url`

Giá trị `signature` phải là nội dung của file `.sig`, không phải URL tới file `.sig`.

## Quy Trình Phát Hành Bản Mới Bằng GitHub Actions

Workflow `.github/workflows/desktop-release.yml` cho phép phát hành bản desktop mới ngay trên GitHub.

Vào GitHub repo:

```text
Actions -> Desktop Release -> Run workflow
```

Nhập:

- `version`: ví dụ `0.2.0`
- `notes`: ghi chú phát hành

Workflow sẽ tự:

1. Cập nhật version trong `src-tauri/tauri.conf.json`.
2. Cập nhật version trong `src-tauri/Cargo.toml`.
3. Build installer Windows.
4. Ký updater bằng `TAURI_SIGNING_PRIVATE_KEY`.
5. Cập nhật `updates/latest.json`.
6. Commit lên `main`.
7. Tạo tag `vX.Y.Z`.
8. Tạo GitHub Release và upload `.exe` + `.sig`.

## Quy Trình Thủ Công Nếu Không Dùng Actions

1. Tăng version trong `src-tauri/tauri.conf.json`.
2. Tăng version trong `src-tauri/Cargo.toml`.
3. Build desktop:

```bash
npm run desktop:build:win
```

4. Upload installer và file `.sig` lên GitHub Release, ví dụ release `v0.2.0`.
5. Cập nhật `updates/latest.json` trỏ tới asset mới.
6. Commit và push `updates/latest.json` lên nhánh `main`.

## Mẫu `latest.json`

```json
{
  "version": "0.2.0",
  "notes": "Ghi chú phát hành",
  "pub_date": "2026-07-05T00:00:00Z",
  "platforms": {
    "windows-x86_64": {
      "signature": "NOI_DUNG_FILE_SIG",
      "url": "https://github.com/buithiha353/TKB/releases/download/v0.2.0/TKB.THCS_0.2.0_x64-setup.exe"
    }
  }
}
```

## Ký Bản Cập Nhật

Khi build release, cấu hình biến môi trường:

```bash
TAURI_SIGNING_PRIVATE_KEY_PATH=.tauri/tkb-thcs.key
TAURI_SIGNING_PRIVATE_KEY_PASSWORD=
```

Không commit private key trong `.tauri/`.

## Blocker Trên Máy Hiện Tại

Máy này đang bị Windows Application Control chặn build script của `tauri-plugin-updater`:

```text
An Application Control policy has blocked this file. (os error 4551)
```

Code updater đã được cấu hình, nhưng để build installer có updater cần mở chính sách này hoặc build trên máy/CI runner khác.
