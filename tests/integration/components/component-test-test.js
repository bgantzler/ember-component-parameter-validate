import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import EmberComponentParametersInitializer from '../../../initializers/ember-component-parameters';

moduleForComponent('component-test', 'Integration | Component | component test', {
  integration: true,

  beforeEach() {
    EmberComponentParametersInitializer.initialize();
  }
});


test('required parameters via string array (can not be null or undefined)', function (assert) {

  this.set("params", [
      "myParam"
    ]
  );

  assert.expect(4);

  assert.throws(() => {
      this.render(hbs`{{require-param parameters=params}}`);
    },
    /to be passed/,
    "Error message contains the correct message"
  );

  this.render(hbs`{{require-param parameters=params myParam="Hello"}}`);
  assert.ok(true);

  this.set("myParam", null);
  assert.throws(() => {
      this.render(hbs`{{require-param parameters=params myParam=myParam}}`);
    },
    /requires the myParam parameter to not be null/,
    "Error message contains the correct message"
  );

  this.set("myParam2", undefined);
  assert.throws(() => {
      this.render(hbs`{{require-param parameters=params myParam=myParam2}}`);
    },
    /requires the myParam parameter to not be undefined/,
    "Error message contains the correct message"
  );
});

test('required parameters as object array (can not be null or undefined)', function (assert) {

  this.set("params", [
      {
        name: "myParam"
      }
    ]
  );

  assert.expect(2);

  assert.throws(() => {
      this.render(hbs`{{require-param parameters=params}}`);
    },
    /to be passed/,
    "Error message contains the correct message"
  );

  this.render(hbs`{{require-param parameters=params myParam="Hello"}}`);
  assert.ok(true);
});

test('optional parameters', function (assert) {

  this.set("params", [
      {
        name: "myParam"
      },
      {
        name: "optParam",
        optional: true
      }
    ]
  );

  assert.expect(2);

  this.render(hbs`{{require-param parameters=params myParam="hello"}}`);
  assert.ok(true);

  this.render(hbs`{{require-param parameters=params myParam="Hello" optParam="optional"}}`);
  assert.ok(true);
});

test('required parameters as closure actions', function (assert) {

  this.set("actions", {
    testAction() {

    }
  });

  this.set("params", [
      {
        name: "myAction",
        type: "action"
      }
    ]
  );

  assert.expect(2);

  assert.throws(() => {
      this.render(hbs`{{require-param parameters=params myAction="hello"}}`);
    },
    /requires the myAction parameter to be a function/,
    "Error message contains the correct message"
  );

  this.render(hbs`{{require-param parameters=params myAction=(action "testAction")}}`);
  assert.ok(true);
});

test('required parameters as classic actions', function (assert) {

  this.set("actions", {
    testAction() {

    }
  });

  this.set("params", [
      {
        name: "myAction",
        type: "action-classic"
      }
    ]
  );

  assert.expect(3);

  this.render(hbs`{{require-param parameters=params myAction="hello"}}`);
  assert.ok(true);

  this.render(hbs`{{require-param parameters=params myAction=(action "testAction")}}`);
  assert.ok(true);

  assert.throws(() => {
      this.render(hbs`{{require-param parameters=params myAction=22}}`);
    },
    /requires the myAction parameter to be of type string or function/,
    "Error message contains the correct message"
  );
});

test('required parameters as a string', function (assert) {

  this.set("actions", {
    testAction() {

    }
  });

  this.set("params", [
      {
        name: "myParam",
        type: "string"
      }
    ]
  );

  assert.expect(2);

  this.render(hbs`{{require-param parameters=params myParam="hello"}}`);
  assert.ok(true);

  assert.throws(() => {
      this.render(hbs`{{require-param parameters=params myParam=22}}`);
    },
    /requires the myParam parameter to be of type string/,
    "Error message contains the correct message"
  );
});

test('required parameters invalid type', function (assert) {

  this.set("actions", {
    testAction() {

    }
  });

  this.set("params", [
      {
        name: "myParam",
        type: "invalid"
      }
    ]
  );

  assert.expect(1);

  assert.throws(() => {
      this.render(hbs`{{require-param parameters=params myParam=22}}`);
    },
    /requires the myParam parameter to be of type invalid/,
    "Error message contains the correct message"
  );
});

test('allow required parameters to be null but not undefined', function (assert) {

  this.set("actions", {
    testAction() {

    }
  });

  this.set("params", [
      {
        name: "myParam",
        allowNull: true
      }
    ]
  );

  assert.expect(2);

  this.set("testParam", null);
  this.render(hbs`{{require-param parameters=params myParam=testParam}}`);
  assert.ok(true);

  this.set("testParam2", undefined);
  assert.throws(() => {
      this.render(hbs`{{require-param parameters=params myParam=testParam2}}`);
    },
    /requires the myParam parameter to not be undefined/,
    "Error message contains the correct message"
  );

});

test('allow required parameters to be undefined but not null', function (assert) {

  this.set("actions", {
    testAction() {

    }
  });

  this.set("params", [
      {
        name: "myParam",
        allowUndefined: true
      }
    ]
  );

  assert.expect(2);

  this.set("testParam", undefined);
  this.render(hbs`{{require-param parameters=params myParam=testParam}}`);
  assert.ok(true);

  this.set("testParam2", null);
  assert.throws(() => {
      this.render(hbs`{{require-param parameters=params myParam=testParam2}}`);
    },
    /requires the myParam parameter to not be null/,
    "Error message contains the correct message"
  );

});

test('allow required parameters to be undefined or null', function (assert) {

  this.set("actions", {
    testAction() {

    }
  });

  this.set("params", [
      {
        name: "myParam",
        allowUndefined: true,
        allowNull: true
      }
    ]
  );

  assert.expect(2);

  this.set("testParam", undefined);
  this.render(hbs`{{require-param parameters=params myParam=testParam}}`);
  assert.ok(true);

  this.set("testParam2", null);
  this.render(hbs`{{require-param parameters=params myParam=testParam2}}`);
  assert.ok(true);

});

test('allow optional parameters to be null but not undefined', function (assert) {

  this.set("actions", {
    testAction() {

    }
  });

  this.set("params", [
      {
        name: "myParam",
        optional: true,
        allowNull: true
      }
    ]
  );

  assert.expect(2);

  this.set("testParam", null);
  this.render(hbs`{{require-param parameters=params myParam=testParam}}`);
  assert.ok(true);

  this.set("testParam2", undefined);
  assert.throws(() => {
      this.render(hbs`{{require-param parameters=params myParam=testParam2}}`);
    },
    /requires the myParam parameter to not be undefined/,
    "Error message contains the correct message"
  );

});

test('allow optional parameters to be undefined but not null', function (assert) {

  this.set("actions", {
    testAction() {

    }
  });

  this.set("params", [
      {
        name: "myParam",
        optional: true,
        allowUndefined: true
      }
    ]
  );

  assert.expect(2);

  this.set("testParam", undefined);
  this.render(hbs`{{require-param parameters=params myParam=testParam}}`);
  assert.ok(true);

  this.set("testParam2", null);
  assert.throws(() => {
      this.render(hbs`{{require-param parameters=params myParam=testParam2}}`);
    },
    /requires the myParam parameter to not be null/,
    "Error message contains the correct message"
  );

});

test('allow optional parameters to be undefined or null', function (assert) {

  this.set("actions", {
    testAction() {

    }
  });

  this.set("params", [
      {
        name: "myParam",
        optional: true,
        allowUndefined: true,
        allowNull: true
      }
    ]
  );

  assert.expect(2);

  this.set("testParam", undefined);
  this.render(hbs`{{require-param parameters=params myParam=testParam}}`);
  assert.ok(true);

  this.set("testParam2", null);
  this.render(hbs`{{require-param parameters=params myParam=testParam2}}`);
  assert.ok(true);

});
