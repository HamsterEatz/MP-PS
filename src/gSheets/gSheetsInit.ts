import { GoogleSpreadsheet } from 'google-spreadsheet';

export default async function gSheetsInit() {
    const api_key = process.env?.GOOGLE_API_KEY || "";
    const sheet_id = process.env?.GOOGLE_SHEET_ID || "";

    const doc = new GoogleSpreadsheet(sheet_id);
    await doc.useApiKey(api_key);
    await doc.loadInfo(); // loads document properties and worksheets
    return doc;
};