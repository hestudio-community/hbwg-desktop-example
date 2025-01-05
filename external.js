const { hbwgConfig, logback } = require("hestudio-bingwallpaper-get");
const fs = require("fs");
const { exec } = require("child_process");

module.exports = {
  refreshtask: () => {
    logback("Outputing wallpaper.jpg ...");
    const imagePath = `${hbwgConfig.tempDir}/wallpaper.jpg`;
    setTimeout(() => {
      fs.writeFileSync(imagePath, hbwgConfig.image);
    }, 1000);
    logback("Outputing wallpaper.jpg done");
    logback("Setting wallpaper ...");
    exec(
      `reg add "HKCU\\Control Panel\\Desktop" /v Wallpaper /t REG_SZ /d "${imagePath}" /f`,
      (error, stdout) => {
        logback(stdout);
        if (error) {
          logback(`Failed to set wallpaper: ${error}`);
        } else {
          exec(
            `RUNDLL32.EXE user32.dll,UpdatePerUserSystemParameters`,
            (error, stdout) => {
              logback(stdout);
              if (error) {
                logback(`Failed to set wallpaper: ${error}`);
              } else {
                logback("Setting wallpaper done");
              }
            }
          );
        }
      }
    );
  },
  debug: {
    method: "GET",
  },
  api: {
    ban: ["getimage", "gettitle", "getcopyright"],
  },
};
