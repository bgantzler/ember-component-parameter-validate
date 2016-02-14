# Ember-component-parameters-validate

Provides checking for component parameters validity.

## Installation

As any other ember-cli addon, run:

```
ember install ember-component-parameters-validate
```

## Documentation

Parameters can be checked for required, that they are appropriate actions, valid type, etc.

Adds an array property `parameters` to all components. This propeerty is concatenated and can
be used similar to the classNames property.

## Making Parameters Required - Simple version

Since the most use case would be just to check for required parameters, an abbreviated usage
is available. Assign an array of required parameter names to the parameters property. If a
parameter name in the array is not passed to the component, an assert will be thrown. Note
required is a true required, a value of null or undefined will also throw an error.

Given

    import Ember from 'ember';
    import layout from '../templates/components/my-component';
    
    export default Ember.Component.extend({
      layout: layout,
      
      parameters: ["requiredParam"]
    });

The following will throw a required error

    {{my-component optionalParam="test"}}


While the following will not throw an error

    {{my-component requiredParam="test Req" optionalParam="test Opt"}}
    
## Parameters Validity Checking

The parameter array also supports an object hash in the form of the following

    {
        name: "paramName",
        optional: false,
        type: "paramType",
        allowNull: false,
        allowUndefined: false,
        customCheck: function(this)
    }

## Hash Properties

---

`name`

Must be present in the hash. This is the name of the parameter to be validated.

---

`optional` *{true | false}*

This is used when you want to not have a parameter required, but still want to make use of the other checks.

Default: **false**

---

`type` { 'action' | 'action-classic' | any typeof result }

  * `action` will check that the parameter is a closure action
  * `action-classic` will check that the parameter is a closure action or a string. SendAction will work with either.
  * anything else will be compared the the result of typeof on the parameter 
      
Default: **No check is performed**

---

`allowNull` *{true | false}*
 
Checks the parameters value for **null** and will allow it (true) or throw an error (false)
 
Default: **false**

 ---
 
`allowUndefined` *{true | false}*

Checks the parameters value for **undefined** and will allow it (true) or throw an error (false)

Default: **false**

---

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

