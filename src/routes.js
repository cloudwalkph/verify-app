import { StackNavigator } from 'react-navigation';
import Events from './modules/events_selector/Events';
// import Polls from './modules/poll/Polls';
import Polls from './modules/poll/Polls';
import Camera from './modules/camera/Camera';
import Reports from './modules/reports/Reports';

const AppNavigator = StackNavigator({
    Home: { screen: Events },
    Polls: { screen: Polls },
    Camera: { screen: Camera },
    Reports: { screen: Reports }
});

export default AppNavigator;