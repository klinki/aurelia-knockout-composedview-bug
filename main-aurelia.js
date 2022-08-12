/* eslint-disable */
requirejs.config({
  baseUrl: "/",
  paths: {
    text: "https://unpkg.com/requirejs-text@2.0.15/text",
    knockout:
      "https://unpkg.com/knockout@3.5.1/build/output/knockout-latest.debug",
    "aurelia-knockout": "./Scripts/aurelia-knockout/amd"
  }
});

Promise.prototype.done = Promise.prototype.then;
Promise.prototype.fail = Promise.prototype.catch;

define("jquery", function () {
  return jQuery;
});
define("knockout", ko);
define("aurelia-pal", au);
define("aurelia-binding", au);
define("aurelia-templating", au);
define("aurelia-dependency-injection", au);
define("aurelia-loader", au);
define("aurelia-router", au);
// define('aurelia-dialog', au);
define("configuration", { mode: "aurelia" });

define(["knockout"], function (knockout) {
  const aurelia = new au.Aurelia();
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(au.PLATFORM.moduleName("aurelia-knockout/aurelia-knockout"));

  au.ViewLocator.prototype.convertOriginToViewUrl = (origin) => {
    let moduleId = origin.moduleId;
    return moduleId.replace("viewmodels", "views") + ".html";
  };

  aurelia
    .start({ debug: true })
    .then(() => {
      aurelia.setRoot("viewmodels/component", document.body);
    })
    .catch((ex) => {
      console.log("error");
      document.body.textContent = `Bootstrap error: ${ex}`;
    });
});
