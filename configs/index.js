import HomeScreen from '../screens/Home';

export const HOME = {
  name: 'screen:home',
  title: 'Home',
  component: HomeScreen,
};

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
