export default {
  methods: {

    waitFor(conditionFn, callback, interval = 50, expiration = 5000) {
      // If element found, call callbacks
      if (conditionFn()) {
        callback();
      // If time has expired, return
      } else if (expiration <= 0) {
        return;
      // Otherwise, try again and decrement expiration
      } else {
        expiration -= interval;
        return setTimeout(this.waitFor.bind(null, conditionFn, callback, interval, expiration), interval);
      }
    },

    backgroundColor(color) {
      return `background-color: ${color}`;
    },
    
    dynamicBackgroundColor(tag) {
      if (!tag) return;
      const color = (window.tagColorMap && window.tagColorMap[tag.name]) ? window.tagColorMap[tag.name] : tag.color;
      console.log('setting to', color);
      return `background-color: ${color}`;
    },

    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString().replace(/\/20(\d\d)$/, '/$1');
    },
  }
}