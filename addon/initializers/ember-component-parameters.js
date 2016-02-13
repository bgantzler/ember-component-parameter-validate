import Ember from 'ember';
let { Component, assert, isArray, get } = Ember;

/**
 * {
 *    name: "",
 *    optional: false,  // If false, throw an error if not present
 *    type: null   // if present, ensure that the type matches "string", "object" etc "action", "action-classic"
 *    allowNull: false // If true, can be null
 *    allowUndefined: false // if true can be undefined
 *    customCheck: undefined // if present and function, call
 * }
 *
 * @returns {*}
 */
export function initialize(/* application */) {
  Component.reopen({
    concatenatedProperties: ['parameters'],
    parameters: [],

    didReceiveAttrs() {

      let parameters = this.get("parameters");

      if (isArray(parameters)) {
        parameters.forEach(item => {
          if (typeof item === "string") {
            item = {name: item};
          }
          let paramName = get(item, "name");

          // Required parameter
          assert(`${this} requires a ${paramName} parameter to be passed`, paramName in this.attrs || !!get(item, "optional"));

          // if present, lets verify it
          if (paramName in this.attrs) {

            // allow null
            assert(`${this} requires the ${paramName} parameter to not be null`, !!get(item, "allowNull") || this.getAttr(paramName) !== null);

            // Not undefined
            assert(`${this} requires the ${paramName} parameter to not be undefined`, !!get(item, "allowUndefined") || this.getAttr(paramName) !== undefined);

            let attrType = typeof this.getAttr(paramName);

            // Correct Type
            let paramType = get(item, "type");
            if (!!paramType) {
              if (paramType === "action") {
                assert(`${this} requires the ${paramName} parameter to be a function`,
                  attrType === "function");
              } else if (paramType === "action-classic") {
                assert(`${this} requires the ${paramName} parameter to be of type string or function`,
                  attrType === "string" ||
                  attrType === "function");
              } else {
                assert(`${this} requires the ${paramName} parameter to be of type ${paramType}`, attrType === paramType);
              }
            }

            // custom
            let custom = get(item, "customCheck");
            if (!!custom && typeof custom === "function") {
              custom.bind(this, item);
            }
          }
        });
      }

      this._super(...arguments);
    }
  });
}

export default {
  name: 'ember-component-parameters',
  initialize
};
