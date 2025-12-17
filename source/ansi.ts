import { rgbFromString } from "./color"
import { getConsole } from "./console"
import { LevelColorMap, LoggerLevel } from "./level"
import { Logger } from "./logger"

/**
 * Create a escape code from `code`
 * @param code The code
 */
export function escapeCode<Code extends number | string>(code: Code): `\x1b[${Code}m`
{
    return `\x1b[${code}m`
}

/**
 * The ANSI escape colors used for terminals in the right order
 */
export enum AnsiColor
{
    Black,
    Red,
    Green,
    Yellow,
    Blue,
    Magenta,
    Cyan,
    White
}

/**
 * Create a foreground color escape code
 * @param color A ANSI color
 */
export function escapeForegroundCode(color: AnsiColor): `\x1b[${number}m`
{
    return escapeCode(30 + color)
}

/**
 * Create a background color escape code
 * @param color A ANSI color
 */
export function escapeBackgroundCode(color: AnsiColor): `\x1b[${number}m`
{
    return escapeCode(40 + color)
}

/**
 * Create a bright foreground color escape code
 * @param code A ANSI color
 */
export function escapeBrightForegroundCode(code: AnsiColor): `\x1b[${number}m`
{
    return escapeCode(90 + code)
}

/**
 * Create a bright background color escape code
 * @param code A ANSI color
 */
export function escapeBrightBackgroundCode(code: AnsiColor): `\x1b[${number}m`
{
    return escapeCode(100 + code)
}

/**
 * Create a foreground color escape code using RGB
 * @param red A value between 0 and 255
 * @param green A value between 0 and 255
 * @param blue A value between 0 and 255
 */
export function escapeForegroundRGB(red: number,green: number,blue: number): `\x1b[38;2;${number};${number};${number}m`
{
    return escapeCode(`38;2;${red & 0xff};${green & 0xff};${blue & 0xff}`)
}

/**
 * Create a backgroound color escape code using RGB
 * @param red A value between 0 and 255
 * @param green A value between 0 and 255
 * @param blue A value between 0 and 255
 */
export function escapeBackgroundRGB(red: number,green: number,blue: number): `\x1b[48;2;${number};${number};${number}m`
{
    return escapeCode(`48;2;${red & 0xff};${green & 0xff};${blue & 0xff}`)
}

const time_color = escapeForegroundCode(2)
const other_color = escapeBrightForegroundCode(0)
const level_colors: LevelColorMap<string> = {
    info: escapeForegroundCode(6),
    warn: escapeForegroundCode(3),
    error: escapeForegroundCode(1),
    debug: escapeForegroundCode(5),
    trace: escapeForegroundCode(4)
}

/**
 * A logger implementation for server runtimes
 */
export class AnsiLogger extends Logger
{
    public print<T extends Array<any>>(level: LoggerLevel, ...args: T): void
    {
        const log = getConsole()[level]
        log(AnsiLogger.formatTime(),AnsiLogger.formatPrefix(level,this.label),...args)
    }
}

export namespace AnsiLogger
{
    /**
     * Format the time section in ANSI
     */
    export function formatTime(): string
    {
        const date = new Date()
        const format = (n: number) => String(n).padStart(2,"0")
        const format_millie = (n: number) => String(n).padStart(3,"0")
        return other_color + "[" +
            time_color + date.getFullYear() +
            other_color + "-" +
            time_color + format(date.getMonth()+1) +
            other_color + "-" +
            time_color + format(date.getDate()) +
            other_color + "/" +
            time_color + format(date.getHours()) +
            other_color + ":" +
            time_color + format(date.getMinutes()) +
            other_color + ":" +
            time_color + format(date.getSeconds()) +
            other_color + "." +
            time_color + format_millie(date.getMilliseconds()) +
            other_color + "]" + escapeCode(0)
    }
    /**
     * Format the prefix section in ANSI
     * @param level The log level
     * @param label A string
     */
    export function formatPrefix(level: LoggerLevel,label: string): string
    {
        return other_color + "[" +
            level_colors[level] + level.toUpperCase() +
            other_color + "/" +
            escapeForegroundRGB(...rgbFromString(label)) + label +
            other_color + "]" + escapeCode(0)
    }
}