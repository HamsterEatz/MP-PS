import gSheetsInit from "./gSheetsInit";

export default async function getRemarks() {
    const doc = await gSheetsInit();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    let info = "*Remarks:*\n";
    for (const row of rows) {
        const name = row?.Name?.trim();
        const rank = row?.Rank?.trim();
        const remarks = row?.Remarks?.trim();

        if (name && rank && remarks) {
            info += `${rank} ${name} (${remarks})\n`;
        }
    }

    return info;
}