/**
 * `String.hashCode` from java for TypeScript (https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0)
 * @param string string to get hashed
 */
export function hashCode(string: string)
{
    let h = 0
    for(let i = 0;i < string.length;i++)
        h = Math.imul(31,h) + string.charCodeAt(i) | 0
    return h
}