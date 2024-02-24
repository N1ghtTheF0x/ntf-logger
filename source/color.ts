import { hashCode } from "./string"

export type RGB = [number,number,number]

/**
 * Get `RGB` from `int`
 * @param int The number to cast to `RGB` values
 * @returns An array with three numbers with the following values: `[red,green,blue]`
 */
export function color_from_int(int: number): RGB
{
    const hex = int.toString(16)
    const red = parseInt(hex.substring(0,2),16)
    const green = parseInt(hex.substring(2,4),16)
    const blue = parseInt(hex.substring(4,6),16)
    return [red,green,blue]
}

/**
 * Get `RGB` from `string`
 * @param string The string to convert to `RGB` values
 * @see {@link color_from_int}
 */
export function color_from_string(string: string)
{
    return color_from_int(hashCode(string))
}