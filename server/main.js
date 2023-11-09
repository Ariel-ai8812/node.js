const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const cors = require("cors");

app.listen(4000);
app.use(express.json());
app.use(cors());

const filePath = path.join("C:", "Users", "user", "nodePro");

app.get("/:folderName?/:fileName?", async (req, res) => {
  const folderName = req.params.folderName || "";
  const fileName = req.params.fileName || "";
  const fileFullPath = path.join(filePath, folderName);

  try {
    if (fs.existsSync(fileFullPath)) {
      if (fs.statSync(fileFullPath).isFile()) {
        const fileContent = fs.readFileSync(fileFullPath);
        return res.send(fileContent);
      } else {
        const files = fs.readdirSync(fileFullPath);
        const fileList = files.map((item) => {
          const itemPath = path.join(fileFullPath, item);
          const stats = fs.statSync(itemPath);
          return {
            name: item,
            type: stats.isFile() ? "File" : "Directory",
            size: stats.size,
            createdAt: stats.ctime,
          };
        });
        return res.json(fileList);
      }
    }
    res.status(404).send("File not found");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/rename", (req, res) => {
  const { oldName, newName } = req.body;
  try {
    fs.renameSync(path.join(filePath, oldName), path.join(filePath, newName));
    res.json({ message: "File renamed successfully" });
  } catch (error) {
    console.error("Error renaming file:", error);
    res.status(500).json({ error: "File rename failed" });
  }
});

app.delete("/delete/:name", (req, res) => {
  const nameDel = req.params.name;
  try {
    fs.unlinkSync(path.join(filePath, nameDel));
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "File delete failed" });
  }
});

app.post("/copy/:name", (req, res) => {
  const nameCopy = req.params.name;
  try {
    fs.copyFileSync(path.join(filePath, nameCopy), path.join(filePath, nameCopy + "_copy"));
    res.json({ message: "File copied successfully" });
  } catch (error) {
    console.error("Error copying file:", error);
    res.status(500).json({ error: "File copy failed" });
  }
});