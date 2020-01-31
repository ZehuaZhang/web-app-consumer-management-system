export function getAlphaNumericOnly(text: string) {
    return text.replace(/\W/g, '')
}