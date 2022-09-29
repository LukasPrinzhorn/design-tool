import Configuration from '../screens/Configuration';
import AccordionScreen from '../screens/AccordionScreen';
import SwipeTool from '../screens/SwipeTool';
import DesignToolHomeScreen from '../screens/DesignToolHome';
import DateTimePicker from '../screens/DateTimePicker';

const DESIGN_TOOL_HOME = {
  name: 'screen:designToolHome',
  title: 'Designtool 1.0',
  component: DesignToolHomeScreen,
};
const CONFIGURATION = {
  name: 'screen:configuration',
  title: 'Configuration',
  component: Configuration,
};
const ACCORDION = {
  name: 'screen:accordion',
  title: 'Accordion (Test)',
  component: AccordionScreen,
};
const SWIPE_TOOL = {
  name: 'screen:swipeTool',
  title: 'Swipe Tool (Test)',
  component: SwipeTool,
};
const DATE_TIME_PICKER = {
  name: 'screen:dateTimePicker',
  title: 'Date Time Picker (Test)',
  component: DateTimePicker,
};

export const homeConfig = [DESIGN_TOOL_HOME, CONFIGURATION, DATE_TIME_PICKER];
