import moment, { Moment } from "moment";
import { getParadeState } from "@gSheets";

export default function getParadeStateModel(isFirstParade: boolean, date: Moment = moment()) {
    const day = date.day();

    // If Sat or Sun
    if (day === 0 || day === 6) {
        return "Parade State is not available on the weekend!";
    }

    return getParadeState(isFirstParade, date);
}