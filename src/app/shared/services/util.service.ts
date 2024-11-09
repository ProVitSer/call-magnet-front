export class UtilService {
    public static isUUIDv4(input: string): boolean {
        const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidv4Regex.test(input);
    }
}
