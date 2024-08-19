const { createRoot } = require("react-dom/client");
const { default: App } = require("./App");


const root=createRoot(document.querySelector("#root"));

root.render(<App/>)