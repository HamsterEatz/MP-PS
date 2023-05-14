import moment, { Moment } from "moment";
import { getParadeState } from "@gSheets";

export default async function getParadeStateModel(isFirstParade: boolean, date: Moment = moment()) {
    const day = date.day();

    // If Sat or Sun
    if (day === 0 || day === 6) {
        return "Parade State is not available on the weekend!";
    }

    const { present, absent, unaccounted } = await getParadeState(isFirstParade, date);
    let info = `*Manpower BR ${date.format('dddd').toUpperCase()} ${date.format('DDMMYY')} ${isFirstParade ? "First" : "Last"} Parade*\n\n*Present:*\n`;

    // Present
    for (let i = 0; i < present.length; i++) {
        info += `${i + 1}) ${present[i]}\n`;
    }

    // Absent
    if (absent.length > 0) {
        info += "\n*Absent:*\n"
        for (let i = 0; i < absent.length; i++) {
            info += `${i + 1}) ${absent[i]}\n`;
        }
    }

    // Unaccounted
    if (unaccounted.length > 0) {
        info += "\n*Unaccounted:*\n"
        for (let i = 0; i < unaccounted.length; i++) {
            info += `${i + 1}) ${unaccounted[i]}\n`;
        }
    }

    return info;
}