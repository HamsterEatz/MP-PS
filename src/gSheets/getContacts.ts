import gSheetsInit from "./gSheetsInit";

export default async function getContacts() {
    const doc = await gSheetsInit();

    const sheet = doc.sheetsByTitle['Contact List'];
    const rows = await sheet.getRows();

    const contacts = [];

    for (const row of rows) {
        const name = row?.Name?.trim();
        const rank = row?.Rank?.trim();
        const contact = row?.Contact?.trim();

        if (name && rank && contact) {
            contacts.push({ name, rank, contact });
        }
    }

    return contacts;
}