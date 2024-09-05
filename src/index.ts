import express, { Request, Response, NextFunction } from "express";
import mysql from "mysql2";
import type { IStudent } from "./types/student";

const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`server is listening on ${port} !`);
});

// 創建一個連接池
export const db = mysql.createConnection({
  host: "localhost", // MySQL 伺服器的位址
  user: "root", // 資料庫使用者名稱
  password: "password", // 資料庫使用者密碼
  database: "school", // 要連接的資料庫名稱
});

// 連接 MySQL 資料庫
db.connect((err) => {
  if (err) {
    console.error("無法連接資料庫: " + err.stack);
    return;
  }
  console.log("成功連接到資料庫");
});

app.get("/", (req: Request, res: Response) => {
  res.send("The server is working!");
});

// 取得學生資料
app.get("/student/:id", (req: Request, res: Response, next: NextFunction) => {
  // 取得 url 中的 id 參數
  const { id } = req.params;
  console.log("id", id);
  const sql = `SELECT * FROM student WHERE s_id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("查詢失敗: " + err.stack);
      return res.status(500).json({ error: "查詢失敗" });
    }
    console.log("results: ", results);
    // if (results.length === 0) {
    //   return res.status(404).json({ error: "找不到使用者" });
    // }
    // res.json(results[0]);
  });
});
