import form from "./form";
// import result from "./result";
import "./app.css";

let formEl;
let resultEl;

function getResult() {
  return import(/* webpackChunkName: "result" */ "./result").then(m => {
    return m.default
  })
}

document.addEventListener("DOMContentLoaded", async () => {
  formEl = document.createElement("div");
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  getResult().then(async m => {
    const result = m;
    resultEl = document.createElement("div");
    resultEl.innerHTML = await result.render();
    document.body.appendChild(resultEl);
  })
});

console.log("app.js");

if (module.hot) {
  console.log("핫 모듈 커짐");

  module.hot.accept("./result", async () => {
    console.log("result 모듈 변경됨");
    resultEl.innerHTML = await result.render();
  });

  module.hot.accept("./form", () => {
    formEl.innerHTML = form.render();
  });
}