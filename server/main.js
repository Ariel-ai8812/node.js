const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
app.listen(4000);
app.use(express.json());
app.use(cors("*"));
getAll();
const filePath = path.join("C:", "Users", "user", "nodePro");

function getAll() {
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
            const itemPath = path.join(filePath, requestedPath, item);
            try {
              const stats = await fs.promises.stat(itemPath);
              fileList.push({
                name: item,
                type: stats.isFile() ? "File" : "Directory",
                size: stats.size,
                createdAt: stats.ctime,
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
}

// function showFile(file) {
//   fs.readFile(path.join(filePath, file), (err, file) => {
//     if (err) console.log(err);
//     else {
//       // res.json(file);
//       console.log(file);
//     }
//   });
// }

app.put("/rename", async (req, res) => {
  const { oldName, newName } = req.body;
  try {
    await fs.renameSync(
      path.join(filePath, oldName),
      path.join(filePath, newName)
    );
    await getAll();
    res.json({ message: "File renamed successfully" });
  } catch (error) {
    console.error("Error renaming file:", error);
  }
});

app.delete("/delete/:name", async (req, res) => {
  const nemeDel = req.params.name;
  try {
    fs.unlinkSync(path.join(filePath, nemeDel));
    console.log("File deleted!");
    getAll();
  } catch (error) {
    console.error("Error delete file:", error);
  }
});

app.post("/copy/:name", async (req, res) => {
  const nameCopy = req.params.name;
  try {
   await fs.appendFileSync(path.join(filePath, nameCopy));
    console.log("file copy!!");
  } catch (error) {
    console.error("Error copy file:", error);
  }
});
