import moment from "moment";
import { getParadeState } from "@gSheets";

export default async function getParadeStateModel(isFirstParade: boolean) {
    const now = moment();
    const currentDay = now.day();

    // If Sat or Sun
    if (currentDay === 0 || currentDay === 6) {
        return "Parade State is not available on the weekend!";
    }

    const { present, absent, unaccounted } = await getParadeState(isFirstParade, currentDay);
    let info = `*Manpower BR ${now.format('dddd').toUpperCase()} ${now.format('DDMMYY')} ${isFirstParade ? "First" : "Last"} Parade*\n\n*Present:*\n`;

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