import { color_from_string } from "./color"
import LoggerLevel, { LevelColorMap } from "./level"
import Logger from "./logger"

export function escape_code<Code extends number | string>(code: Code): `\x1b[${Code}m`
{
    return `\x1b[${code}m`
}

export enum AnsiColors
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

export function escape_fg_code(code: AnsiColors)
{
    return escape_code(30 + code)
}

export function escape_bg_code(code: AnsiColors)
{
    return escape_code(40 + code)
}

export function escape_bfg_code(code: number)
{
    return escape_code(90 + code)
}

export function escape_bbg_code(code: number)
{
    return escape_code(100 + code)
}

export function escape_fg_rgb(red: number,green: number,blue: number)
{
    return escape_code(`38;2;${red & 0xff};${green & 0xff};${blue & 0xff}`)
}

export function escape_bg_rgb(red: number,green: number,blue: number)
{
    return escape_code(`48;2;${red & 0xff};${green & 0xff};${blue & 0xff}`)
}

const time_color = escape_fg_code(2)
const other_color = escape_bfg_code(0)
const level_colors: LevelColorMap<string> = {
    info: escape_fg_code(6),
    warn: escape_fg_code(3),
    error: escape_fg_code(1),
    debug: escape_fg_code(5),
    trace: escape_fg_code(4)
}

function format_time()
{
    const date = new Date()
    const format = (n: number) => String(n).padStart(2,"0")
    return other_color + "[" +
           time_color + date.getFullYear() +
           other_color + "-" +
           time_color + format(date.getMonth()) +
           other_color + "-" +
           time_color + format(date.getDate()) +
           other_color + "/" +
           time_color + format(date.getHours()) +
           other_color + ":" +
           time_color + format(date.getMinutes()) +
           other_color + ":" +
           time_color + format(date.getSeconds()) +
           other_color + "." +
           time_color + format(date.getMilliseconds()) +
           other_color + "]" + escape_code(0)
}

function format_prefix(level: LoggerLevel,label: string)
{
    return other_color + "[" +
           level_colors[level] + level.toUpperCase() +
           other_color + "/" +
           escape_fg_rgb(...color_from_string(label)) + label +
           other_color + "]" + escape_code(0)
}

export class AnsiLogger extends Logger
{
    public print<T extends Array<any>>(level: LoggerLevel, ...args: T): void
    {
        const log = console[level]
        log(format_time(),format_prefix(level,this.label),...args)
    }
}