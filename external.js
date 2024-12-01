const { hbwgConfig, logback } = require("hestudio-bingwallpaper-get");
const fs = require("fs");
const { exec } = require("child_process");

module.exports = {
  refreshtask: () => {
    logback("Outputing wallpaper.jpg ...");
    const imagePath = `${hbwgConfig.tempDir}/wallpaper.jpg`;
    fs.writeFileSync(imagePath, hbwgConfig.image);
    logback("Outputing wallpaper.jpg done");
    logback("Setting wallpaper ...");
    exec(
      `reg add "HKCU\\Control Panel\\Desktop" /v Wallpaper /t REG_SZ /d "${imagePath}" /f`,
      (error) => {
        if (error) {
          logback(`Failed to set wallpaper: ${error}`);
        } else {
          exec(`RUNDLL32.EXE user32.dll,UpdatePerUserSystemParameters`);
          logback("Setting wallpaper done");
        }
      }
    );
  },
  debug: {
    method: "GET",
  },
};
