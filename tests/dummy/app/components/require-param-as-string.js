import Ember from 'ember';
import layout from '../templates/components/require-param-as-string';

export default Ember.Component.extend({
  layout: layout,

  parameters: ["myParam"]
});
