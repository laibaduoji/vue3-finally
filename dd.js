import { exec } from "child_process";

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing command: ${error.message}`);
        return;
      }
      if (stderr) {
        console.warn(`stderr: ${stderr}`); // 打印警告信息，但不影响程序
      }
      resolve(stdout);
    });
  });
};

const executeCommands = async () => {
  try {
    console.log("Running build-only...");
    await runCommand("npm run build-only");
    console.log("Build completed.");

    console.log("Adding changes to git...");
    await runCommand("git add .");
    console.log("Changes added to git.");

    console.log("Committing changes...");
    await runCommand('git commit -m "1"');
    console.log("Changes committed.");

    console.log("Pushing to remote...");
    await runCommand("git push");
    console.log("Push completed.");
  } catch (error) {
    console.error("Error during execution:", error);
  }
};

// 执行所有命令
executeCommands();
