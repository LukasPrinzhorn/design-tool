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

/*
export const initialLinesConfig = {
  config: [
    {
      id: '1',
      textColor: ['text1Color'],
      boxColor: ['box1Color'],
      widths: ['100%'],
      texts: [0],
    },
    {
      id: '2',
      textColor: ['text2Color'],
      boxColor: ['box2Color'],
      widths: ['100%'],
      texts: [1],
    },
    {
      id: '3',
      textColor: ['text1Color'],
      boxColor: ['box1Color'],
      widths: ['100%'],
      texts: [0],
    },
    {
      id: '4',
      textColor: ['text2Color'],
      boxColor: ['box2Color'],
      widths: ['100%'],
      texts: [1],
    },
    {
      id: '5',
      textColor: ['text1Color', 'text2Color'],
      boxColor: ['box1Color', 'box2Color'],
      widths: ['50%', '50%'],
      texts: [0, 1],
    },
    {
      id: '6',
      textColor: ['text1Color', 'text2Color'],
      boxColor: ['box1Color', 'box2Color'],
      widths: ['50%', '50%'],
      texts: [0, 1],
    },
    {
      id: '7',
      textColor: ['text1Color', 'text2Color', 'text1Color'],
      boxColor: ['box1Color', 'box2Color', 'box1Color'],
      widths: ['33.33%', '33.33%', '33.33%'],
      texts: [0, 1, 0],
    },
    {
      id: '8',
      textColor: ['text1Color', 'text2Color'],
      boxColor: ['box1Color', 'box2Color'],
      widths: ['33.33%', '66.66%'],
      texts: [0, 1],
    },
    {
      id: '9',
      textColor: ['text1Color', 'text2Color'],
      boxColor: ['box1Color', 'box2Color'],
      widths: ['66.66%', '33.33%'],
      texts: [0, 1],
    },
    {
      id: '10',
      textColor: ['text1Color', 'text2Color', 'text1Color', 'text2Color'],
      boxColor: ['box1Color', 'box2Color', 'box1Color', 'box2Color'],
      widths: ['25%', '25%', '25%', '25%'],
      texts: [0, 1, 0, 1],
    },
  ],
};
*/
