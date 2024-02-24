import { readFileSync, readdirSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

const dist = resolve(process.cwd(),"dist","esm")

function get_files(dir: string)
{
    const files: Array<string> = []
    const dirents = readdirSync(dir,{withFileTypes: true})
    for(const dirent of dirents)
    {
        const fullpath = resolve(dirent.path,dirent.name)
        if(dirent.isFile())
        {
            files.push(fullpath)
            continue
        }
        if(dirent.isDirectory())
        {
            files.push(...get_files(fullpath))
            continue
        }
    }
    return files
}

function fix_file(file: string)
{
    let content = readFileSync(file,"utf-8")
    const lines = content.split("\n")
    const imports = lines.filter((line) => line.startsWith("import"))
    .map((line) => line.substring(line.indexOf('"'),line.lastIndexOf('"')+1))
    const fixed_imports = imports.map((imp) =>  `"${imp.substring(1,imp.length-1) + (!imp.endsWith(".js") ? ".js" : "")}"`)
    for(let index = 0;index < imports.length;index++)
    {
        content = content.replace(imports[index],fixed_imports[index])
    }
    writeFileSync(file,content,"utf-8")
}

const files = get_files(dist).filter((file) => file.endsWith(".js"))

console.dir(files)
files.forEach(fix_file)