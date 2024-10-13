import { Dataset } from "crawlee";

const runner = async () => {
  // Write a single row to the default dataset
  await Dataset.pushData({ col1: 123, col2: "val2" });

  // Open a named dataset
  const dataset = await Dataset.open("default");

  // Write a single row
  await dataset.pushData({ foo: "bar" });

  // Write multiple rows
  await dataset.pushData([{ foo: "bar2", col2: "val2" }, { col3: 123 }]);

  // Export the entirety of the dataset to one file in the key-value store
  // await dataset.exportToCSV("MY-DATA");

  const res = await dataset.getData({
    fields: ["col2", "col1"],
  });

  console.log(`[yanle] - res`, res);

  dataset.exportToJSON("data_source_demo");

  // await dataset.forEach(async (item, index) => {
  //   console.log(`Item at ${index}: ${JSON.stringify(item)}`);
  // });
};

runner();
