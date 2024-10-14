import { map, toNumber, trim } from "lodash";
// @ts-expect-error
import jsonData from "./2024_10_01.json";

/**
 * 修正数据
 */
const handleData = () => {
  const data = map(jsonData, (item) => {
    const applaud = trim(item.applaud)?.replace(/\/n/gi, "");

    const applaudNumber = applaud ? toNumber(applaud) : 0;

    return {
      ...item,
      applaud: applaudNumber,
    };
  });

  const json = JSON.stringify(data);

  const fs = require("fs");

  fs.writeFile("data.json", json, (err: Error) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Data written to file successfully.");
    }
  });
};

handleData();
