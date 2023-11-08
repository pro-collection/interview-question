import { confirm } from "@inquirer/prompts";

const main = async () => {
  const isConfirm = await confirm({ message: `获取到热度为：` });
  console.log("yanle - logger: isConfirm", {
    isConfirm,
    type: typeof isConfirm,
  });
};

main()
