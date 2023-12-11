export const numberToDecimal = (number: number | undefined) => {
    if (number) return new Intl.NumberFormat("ru-RU").format(number)
    return ""
}