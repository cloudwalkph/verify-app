if (__DEV__) {
    module.exports = require('./configStore.dev');
} else {
    module.exports = require('./configStore.prod');
}