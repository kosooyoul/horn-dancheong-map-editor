module.exports = {
  apps: [
    {
      name: "horn-dancheong-map-editor",
      exec_mode: "cluster",
      instances: "1", // Or a number of instances
      script: "./dist/main.js",
      args: "start"
    }
  ]
}

