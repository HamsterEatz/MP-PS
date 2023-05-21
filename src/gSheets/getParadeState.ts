import { PRESENT, LEGENDS } from "../constants";
import moment, { Moment } from 'moment';
import gSheetsInit from "./gSheetsInit";

export default async function getParadeState(isFirstParade: boolean, date: Moment) {
    const doc = await gSheetsInit();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    await sheet.loadCells();

    const present: string[] = new Array();
    const absent: string[] = new Array();
    const unaccounted: string[] = new Array();

    const day = date.day();

    for (const row of rows) {
        const name = row?.Name?.trim();
        const rank = row?.Rank?.trim();
        const remarks = row?.Remarks?.trim();

        if (!name) {
            continue;
        }

        const colIndex = isFirstParade ? day * 2 + 1 : day * 2 + 2;
        const state = String(sheet.getCell(row.rowIndex - 1, colIndex).value)?.trim();

        if (state.toUpperCase() === PRESENT) {
            present.push(`${rank} ${name}`);
            continue;
        }

        // Unaccounted
        if (!state || !state?.trim() || state === "null") {
            unaccounted.push(`${rank} ${name}`);
            continue;
        }

        if (state?.includes("from")) {
            absent.push(`${rank} ${name} (${state})`);
            continue;
        }

        if (remarks?.includes("from")) {
            let isAppended = false;
            for (const legend of Object.values(LEGENDS)) {
                if (state === legend) {
                    const dateRange = remarks.split("from ")[1];
                    const splittedDates = dateRange.split("-");
                    const startDate = moment(splittedDates[0], 'DD/MM');
                    const endDate = moment(splittedDates[1], 'DD/MM');

                    if (date.isBetween(startDate, endDate) || date.isSame(startDate, 'day') || date.isSame(endDate, 'day')) {
                        absent.push(`${rank} ${name} (${remarks})`);
                        isAppended = true;
                    }
                    break;
                }
            }
            if (isAppended) {
                continue;
            }
        }

        // Calculate duration
        let hasDuration = false;
        for (const legend of Object.values(LEGENDS)) {
            if (state.trim().toUpperCase().includes(legend)) {
                const data = row._rawData;
                let daysToSubtractToStartDate = 0;
                let daysToAddToEndDate = 0;

                // Calculate startDate
                for (let y = day * 2 + (isFirstParade ? 0 : 1); y > 2; y--) {
                    if (data[y] !== legend) {
                        const startDay = Math.floor(y / 2);
                        daysToSubtractToStartDate = day - startDay;
                        break;
                    }
                }

                // Calculate endDate
                for (let y = day * 2 + (isFirstParade ? 2 : 3); y < 13; y++) {
                    if (!data[y] || data[y] !== legend) {
                        const endDay = Math.floor((y - 2) / 2);
                        daysToAddToEndDate = endDay - day;
                        break;
                    }
                }

                const startDate = date.clone().subtract(daysToSubtractToStartDate, 'days');
                const endDate = date.clone().add(daysToAddToEndDate, 'days');

                absent.push(`${rank} ${name} (${state} from ${startDate.format('DD/MM')}-${endDate.format('DD/MM')})`);
                hasDuration = true;
                break;
            }
        }
        if (hasDuration) {
            continue;
        }

        absent.push(`${rank} ${name} (${state})`);
    }

    return { present, absent, unaccounted };
}
