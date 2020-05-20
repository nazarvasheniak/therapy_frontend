export class StringHelper {
    static getFirstLetter(value: string) {
        if (!value || value == "") {
            return "";
        }

        return value.substr(0, 1);
    }
}