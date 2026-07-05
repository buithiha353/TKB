const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1EkmLRv1WFJYbPMGkD2kJBv6FXS_A3D3XkApRn8d5ceY/export?format=csv";

/**
 * Lấy dữ liệu tài khoản từ Google Sheets (định dạng CSV)
 * Trả về true nếu tài khoản và mật khẩu khớp với 1 dòng trong file.
 */
export async function authenticateWithGoogleSheet(usernameInput: string, passwordInput: string): Promise<boolean> {
  try {
    const response = await fetch(SHEET_CSV_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch auth data: ${response.statusText}`);
    }

    const csvText = await response.text();
    
    // Tách các dòng. Hỗ trợ cả \r\n (Windows) và \n (Unix)
    const lines = csvText.split(/\r?\n/);
    
    // Bỏ qua dòng tiêu đề nếu có (giả sử cột A là Username, B là Password)
    // Nếu file chỉ có dữ liệu mà không có header, ta sẽ check toàn bộ các dòng.
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Xử lý CSV cơ bản: tách theo dấu phẩy.
      // Cấu trúc mong đợi: "username","password" hoặc username,password
      const parts = line.split(',');
      if (parts.length >= 2) {
        // Loại bỏ dấu nháy kép (nếu có do Google Sheets tự chèn khi xuất CSV)
        const rowUser = parts[0].replace(/^"|"$/g, '').trim();
        const rowPass = parts[1].replace(/^"|"$/g, '').trim();

        if (rowUser === usernameInput && rowPass === passwordInput) {
          return true;
        }
      }
    }
    
    return false; // Không khớp dòng nào
  } catch (error) {
    console.error("Auth fetch error:", error);
    throw new Error("Không thể kết nối đến máy chủ xác thực.");
  }
}
