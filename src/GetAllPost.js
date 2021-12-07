const fs = require('fs')

const dir = '/project/gem/posts'
const files = fs.readdirSync(dir)
let filesArray = [{"title":"What is GeM","slug":"/"}];

for (const file of files) {
    let fileDetail = file.replace('.mdx', '').replace('-',' ').replace('_',' ');
    const arr = fileDetail.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    
    }
    const str2 = arr.join(" ");
    const NewArray =    {
        title: str2,
        slug: file.replace('.mdx', '')
    };
    filesArray.push(NewArray);
}
const pathOfDataFile = "/project/gem/src/data.json";
//write file
fs.writeFileSync(pathOfDataFile, JSON.stringify(filesArray));
console.log(filesArray);