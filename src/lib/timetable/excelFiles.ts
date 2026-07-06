import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const isDesktopApp = import.meta.env.VITE_DESKTOP === "true";

export async function saveWorkbookWithDialog(workbook: ExcelJS.Workbook, defaultPath: string) {
  const buffer = await workbook.xlsx.writeBuffer();

  if (!isDesktopApp) {
    saveAs(new Blob([buffer]), defaultPath);
    return true;
  }

  const [{ save }, { writeFile }] = await Promise.all([
    import("@tauri-apps/plugin-dialog"),
    import("@tauri-apps/plugin-fs"),
  ]);

  const path = await save({
    title: "Lưu file Excel",
    defaultPath,
    filters: [{ name: "Excel Workbook", extensions: ["xlsx"] }],
  });

  if (!path) return false;

  await writeFile(path, new Uint8Array(buffer as ArrayBuffer));
  return true;
}

export async function openWorkbookFromUser() {
  if (isDesktopApp) {
    const [{ open }, { readFile }] = await Promise.all([
      import("@tauri-apps/plugin-dialog"),
      import("@tauri-apps/plugin-fs"),
    ]);

    const path = await open({
      title: "Chọn file Excel",
      multiple: false,
      filters: [{ name: "Excel Workbook", extensions: ["xlsx", "xls"] }],
    });

    if (!path || Array.isArray(path)) return null;

    const data = await readFile(path);
    const arrayBuffer = data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength,
    ) as ArrayBuffer;
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);
    return workbook;
  }

  const file = await new Promise<File | null>((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx,.xls";
    input.onchange = () => resolve(input.files?.[0] ?? null);
    input.click();
  });

  if (!file) return null;

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(await file.arrayBuffer());
  return workbook;
}

export function readCellText(row: ExcelJS.Row, index: number) {
  const value = row.getCell(index).value;
  if (value === null || value === undefined) return "";
  if (typeof value === "object" && "text" in value) return String(value.text).trim();
  if (typeof value === "object" && "richText" in value) {
    return value.richText
      .map((part) => part.text)
      .join("")
      .trim();
  }
  return String(value).trim();
}

export function splitCellList(value: string) {
  return value
    .split(/[;,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizeLookup(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("vi-VN")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

export function styleTemplateHeader(row: ExcelJS.Row) {
  row.font = { bold: true };
  row.alignment = { horizontal: "center", vertical: "middle" };
  row.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFEAF2FF" },
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });
}
