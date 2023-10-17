import {format, parse} from "date-fns";

export function formatDate(dateStr) {
    const dateObject = parse(dateStr, 'dd/MM/yyyy', new Date());
    return format(dateObject, 'dd/MM');
}