import { ILoggerBase } from "./types"

let curConsole: ILoggerBase

/**
 * Get the global `console` object that should be normally available on every JavaScript runtime
 */
export function getEMCAConsole(): ILoggerBase | undefined
{
    if("console" in globalThis)
        // @ts-ignore
        return console
    return undefined
}

/**
 * Get any kind of instance of a console
 * @throws The runtime has no stdout support
 */
export function getConsole(): ILoggerBase
{
    if(curConsole !== undefined)
        return curConsole
    let console = getEMCAConsole()
    if(console !== undefined)
        return curConsole = console
    throw new Error("this runtime does not support console output")
}