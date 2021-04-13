import Configuration from '../screens/Configuration';
import AccordionScreen from '../screens/AccordionScreen';
import SwipeTool from '../screens/SwipeTool';
import DesignToolHomeScreen from '../screens/DesignToolHome';

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

export const homeConfig = [DESIGN_TOOL_HOME, CONFIGURATION];
