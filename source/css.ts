import { color_from_string } from "./color"
import LoggerLevel, { LevelColorMap } from "./level"
import Logger from "./logger"

export function css_color<Red extends number,Green extends number,Blue extends number>(red: Red, green: Green, blue: Blue): `color: rgb(${Red},${Green},${Blue})`
{
    return `color: rgb(${red},${green},${blue})`
}

const time_color = css_color(0,170,0)
const other_color = css_color(85,85,85)
const level_colors: LevelColorMap<string> = {
    info: css_color(0,170,170),
    warn: css_color(170,85,0),
    error: css_color(170,0,0),
    debug: css_color(170,0,170),
    trace: css_color(0,0,170)
}

function format_time()
{
    const date = new Date()
    const format = (n: number) => String(n).padStart(2,"0")
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
           "%c" + format(date.getMilliseconds()) +
           "%c" + "]"
}

function format_prefix(level: LoggerLevel,label: string)
{
    return "[" +
           "%c" + level.toUpperCase() +
           "%c" + "/" +
           "%c" + label +
           "%c" + "]"
}

export class CSSLogger extends Logger
{
    public print<T extends Array<any>>(level: LoggerLevel, ...args: T): void
    {
        const log = console[level]
        log(
            `${format_time()} ${format_prefix(level,this.label)}`,
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
            css_color(...color_from_string(this.label)), // label
            other_color, // ]
            ...args
        )
    }
}