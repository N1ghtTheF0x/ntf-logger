import { hashCode } from "./string"

/**
 * An array that represents the RGB components
 */
export type RGB = [number,number,number]

/**
 * Get the RGB values from an integer
 * @param integer A number
 */
export function rgbFromInteger(integer: number): RGB
{
    const rgb: RGB = [0,0,0]
    for(let i = 0;i < rgb.length;i++)
        rgb[i] = Math.abs((integer >> (i * 8)) & 0xff)
    return rgb
}

/**
 * Get the RGB values from a string
 * @param string A string
 * @see {@link rgbFromInteger}
 */
export function rgbFromString(string: string)
{
    return rgbFromInteger(hashCode(string))
}