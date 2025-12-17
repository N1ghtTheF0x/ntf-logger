import { rgbFromString } from "./color"
import { getConsole } from "./console"
import { LevelColorMap, LoggerLevel } from "./level"
import { Logger } from "./logger"

/**
 * Create a CSS rgb function
 * @param red A number from 0 to 255
 * @param green A number from 0 to 255
 * @param blue A number from 0 to 255
 */
export function cssCreateRGB(red: number, green: number, blue: number): `color: rgb(${number},${number},${number})`
{
    return `color: rgb(${red & 0xff},${green & 0xff},${blue & 0xff})`
}

const time_color = cssCreateRGB(0,170,0)
const other_color = cssCreateRGB(85,85,85)
const level_colors: LevelColorMap<string> = {
    info: cssCreateRGB(0,170,170),
    warn: cssCreateRGB(170,85,0),
    error: cssCreateRGB(170,0,0),
    debug: cssCreateRGB(170,0,170),
    trace: cssCreateRGB(0,0,170)
}

/**
 * A logger implementation for browsers
 */
export class CSSLogger extends Logger
{
    public print<T extends Array<any>>(level: LoggerLevel, ...args: T): void
    {
        const log = getConsole()[level]
        log(
            `${CSSLogger.formatTime()} ${CSSLogger.formatPrefix(level,this.label)}`,
            other_color, // [
            time_color, // year
            other_color, // -
            time_color, // month
            other_color, // -
            time_color, // day
            other_color, // /
            time_color, // hour
            other_color, // :
            time_color, // minute
            other_color, // :
            time_color, // second
            other_color, // .
            time_color, // milliseconds
            other_color, // ] [
            level_colors[level], // level
            other_color, // /
            cssCreateRGB(...rgbFromString(this.label)), // label
            other_color, // ]
            ...args
        )
    }
}

export namespace CSSLogger
{
    /**
     * Format the time section using CSS
     */
    export function formatTime(): string
    {
        const date = new Date()
        const format = (n: number) => String(n).padStart(2,"0")
        const format_millie = (n: number) => String(n).padStart(3,"0")
        return "%c" + "[" +
            "%c" + date.getFullYear() +
            "%c" + "-" +
            "%c" + format(date.getMonth()+1) +
            "%c" + "-" +
            "%c" + format(date.getDate()) +
            "%c" + "/" +
            "%c" + format(date.getHours()) +
            "%c" + ":" +
            "%c" + format(date.getMinutes()) +
            "%c" + ":" +
            "%c" + format(date.getSeconds()) +
            "%c" + "." +
            "%c" + format_millie(date.getMilliseconds()) +
            "%c" + "]"
    }
    /**
     * Format the prefix section using CSS
     * @param level The log level
     * @param label A label
     */
    export function formatPrefix(level: LoggerLevel,label: string): string
    {
        return "[" +
           "%c" + level.toUpperCase() +
           "%c" + "/" +
           "%c" + label +
           "%c" + "]"
    }
}