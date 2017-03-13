import Config from 'react-native-config';

if (Config.ENV === 'local') {
    module.exports = require('./configStore.dev');
} else {
    module.exports = require('./configStore.prod');
}