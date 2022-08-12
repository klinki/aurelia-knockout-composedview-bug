/* eslint-disable */

// app/viewmodels/Component.js
define(["exports", "aurelia-router"], function (exports, auRouter) {
  var Component = (function () {
    var self = {};
    Component.inject = [];

    function Component() {
      self = this;


      this.activeTab = ko.observable("a");
      this.composedView = ko.observable();
      this.tabs = [
        tab("a", self.openTabA),
        tab("b", self.openTabB),
        tab("c", self.openTabC),
      ];
    }

    Component.prototype.rapidlyChangeTabs = function() {
      self.openTabA();
      self.openTabB();
      self.openTabC();
    };

    Component.prototype.openTabA = function() {
      self.changeComposedView('viewmodels/tabA');
    };

    Component.prototype.openTabB = function() {
      self.changeComposedView('viewmodels/tabB');
    };

    Component.prototype.openTabC = function() {
      self.changeComposedView('viewmodels/tabC');
    };

    Component.prototype.isActiveTab = function(tab) {
      return tab === self.activeTab();
    };

    Component.prototype.attached = function () {};

    Component.prototype.activate = function () {
      this.changeComposedView('viewmodels/tabA');
    };


    Component.prototype.changeComposedView = function (modelPath) {
      var activationData = {};
      var isGridView = false;

      var newComposed = {
        model: modelPath,
        activationData: activationData,
        modelPath: modelPath,
        isGridView: isGridView
      };
      self.composedView(newComposed);
    };

    Component.prototype.canChangeComposedView = function() {
      return true;
    };

    var tab = function(text, action) {
      return {
        text: text,
        clickAction: function (e) {
          if (typeof action === 'function') {
            if (self.canChangeComposedView()) {
              self.activeTab(text);
              action();
            } else {
              self.useDropChangesDialog(function () {
                self.activeTab(text);
                action();
              });
            }

            return true;
          }
        }
      };
    };


    return Component;
  })();

  exports.Component = Component;
});
