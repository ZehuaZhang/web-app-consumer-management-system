export function getNumericOnly(text: string) {
    return (text || '').replace(/[^\d^.]/g, '')
}