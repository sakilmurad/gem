const fs = require("fs");

const dir = "posts";

const files = fs.readdirSync(dir);
let filesArray = [
  {
    title: "What is GeM",
    slug: "what-is-gem",
    created: "2021-12-10T17:48:29.837Z",
  },
];

function createdDate(file) {
  const { birthtime } = fs.statSync(`posts/${file}`);

  return birthtime;
}

for (const file of files) {
  let fileDetail = file
    .replace(".mdx", "")
    .replace(new RegExp("-", "g"), " ")
    .replace(new RegExp("_", "g"), " ");
  const arr = fileDetail.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  const filedate = createdDate(file);
  const NewArray = {
    title: str2,
    slug: file.replace(".mdx", ""),
    created: filedate,
  };
  filesArray.push(NewArray);
}

// short the array
filesArray.sort(function (a, b) {
  var dateA = new Date(a.created),
    dateB = new Date(b.created);
  return dateA - dateB;
});
const pathOfDataFile = "src/data.json";
//write file
fs.writeFileSync(pathOfDataFile, JSON.stringify(filesArray));
console.log("sidebar generated");
