import { hashCode } from "./string"

export type RGB = [number,number,number]

/**
 * Get `RGB` from `int`
 * @param int The number to cast to `RGB` values
 * @returns An array with three numbers with the following values: `[red,green,blue]`
 */
export function color_from_int(int: number): RGB
{
    const rgb: RGB = [0,0,0]
    for(let i = 0;i < rgb.length;i++)
        rgb[i] = Math.abs((int >> (i * 8)) & 0xff)
    return rgb
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