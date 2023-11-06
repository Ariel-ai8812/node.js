const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
app.listen(4000);
app.use(cors());

const filePath = path.join("C:", "Users", "user", "nodePro");

app.get("/*", (req, res) => {
  const requestedPath = decodeURI(req.url);
  console.log(requestedPath);

  fs.readdir(path.join(filePath, requestedPath), async (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (files.length === 0) {
        res.send("No files in the directory");
      } else {
        const fileList = [];

        for (const item of files) {
          const itemPath = path.join(filePath,requestedPath, item);
          try {
            const stats = await fs.promises.stat(itemPath);
            fileList.push({
              name: item,
              type: stats.isFile() ? "File" : "Directory",
              size: stats.size, // Size in bytes
              createdAt: stats.ctime, // Created timestamp
            });
          } catch (error) {
            console.error("Error reading file stats:", error);
          }
        }

        res.json(fileList);
      }
    }
  });
});

// function showFile(file) {
//   fs.readFile(path.join(filePath, file), (err, file) => {
//     if (err) console.log(err);
//     else {
//       // res.json(file);
//       console.log(file);
//     }
//   });
// }

// function rename(rename, name) {
//   fs.rename(rename, name, function (err) {
//     if (err) throw err;
//     console.log("File Renamed!");
//   });
// }

// function deleteFile(file) {
//   fs.unlink(file, function (err) {
//     if (err) throw err;
//     console.log("File deleted!");
//   });
// }
