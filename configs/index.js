export const HOME = {
  name: 'screen:home',
  title: 'Home',
};
export const DESIGN_TOOL_HOME = {
  name: 'screen:designToolHome',
  title: 'Designtool 1.0',
};
export const CONFIGURATION = {
  name: 'screen:configuration',
  title: 'Configuration',
};
export const ACCORDION = {
  name: 'screen:accordion',
  title: 'Accordion',
};
export const SWIPE_TOOL = {
  name: 'screen:swipeTool',
  title: 'Swipe Tool',
};

export const homeConfig = [DESIGN_TOOL_HOME, CONFIGURATION, ACCORDION, SWIPE_TOOL];

export const initialColorsConfig = [
  { id: 1, fieldName: 'text1Color', color: '#006000' },
  { id: 2, fieldName: 'box1Color', color: '#bbffff' },
  { id: 3, fieldName: 'text2Color', color: '#000000' },
  { id: 4, fieldName: 'box2Color', color: '#ffffff' },
];

export const initialLinesConfig = {
  config: [],
  isLoading: true,
};

export const initialFieldsConfig = {
  id: 0,
  numberOfBoxes: 2,
  numberOfTexts: 2,
};
