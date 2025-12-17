/**
 * Create a hash from a string ({@link https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37 origin})
 * @param string A string
 */
export function hashCode(string: string): number
{
    let h = 0
    if(string.length === 0) return 0
    for(let i = 0;i < string.length;i++)
    {
        h = string.charCodeAt(i) + ((h << 5) - h)
        h = h & h
    }
    return h
}