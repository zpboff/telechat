import { format } from 'date-fns';
import { ru } from "date-fns/locale";

export function dateToString(value: Date): string {
    return format(value, "dd MMMM yyyy г.",{ locale: ru });
}