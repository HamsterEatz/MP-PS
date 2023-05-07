import { PRESENT } from "../constants";
import gSheetsInit from "./gSheetsInit";

export default async function getParadeState(isFirstParade: boolean, currentDay: number) {
    const doc = await gSheetsInit();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    await sheet.loadCells();

    const present: string[] = new Array();
    const absent: string[] = new Array();
    const unaccounted: string[] = new Array();

    for (const row of rows) {
        const name = row?.Name?.trim();
        const rank = row?.Rank?.trim();
        const remarks = row?.Remarks?.trim();

        if (!name) {
            continue;
        }

        const colIndex = isFirstParade ? currentDay * 2 + 1 : currentDay * 2 + 2;
        const state = String(sheet.getCell(row.rowIndex - 1, colIndex).value)?.trim();

        if (state.toUpperCase() === PRESENT) {
            present.push(`${rank} ${name}`);
            continue;
        }

        if (state?.includes("from") || remarks?.includes("from")) {
            const text = state.includes("from") ? state : remarks;
            absent.push(`${rank} ${name} (${text})`);
            continue;
        }

        unaccounted.push(`${rank} ${name}`);
    }

    return { present, absent, unaccounted };
}