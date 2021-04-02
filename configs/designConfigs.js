import ColorEditor from '../screens/ColorEditor';
import { FontEditor } from '../screens/FontEditor';
import { IconsViewer } from '../screens/IconsViewer';
import { ViewSizeDisplay } from '../screens/ViewSizeDisplayer';
import { ExperimentalTab } from '../screens/ExperimentalTab';

const COLOR_EDITOR = {
  name: 'screen:colorEditor',
  title: 'Color Editor',
  iconFocused: 'color-palette',
  iconUnfocused: 'color-palette-outline',
  component: ColorEditor,
};
const FONT_EDITOR = {
  name: 'screen:fontEditor',
  title: 'Font Editor',
  iconFocused: 'color-wand',
  iconUnfocused: 'color-wand-outline',
  component: FontEditor,
};
const ICONS_VIEWER = {
  name: 'screen:iconsViewer',
  title: 'Icons Viewer',
  iconFocused: 'people',
  iconUnfocused: 'people-outline',
  component: IconsViewer,
};
const VIEW_SIZE_DISPLAY = {
  name: 'screen:viewSizeDisplay',
  title: 'View Size',
  iconFocused: 'resize',
  iconUnfocused: 'resize',
  component: ViewSizeDisplay,
};
const EXPERIMENTAL_TAB = {
  name: 'screen:experimentalTab',
  title: 'Experimental',
  iconFocused: 'help-circle',
  iconUnfocused: 'help-circle-outline',
  component: ExperimentalTab,
};

export const designToolConfig = [
  COLOR_EDITOR,
  FONT_EDITOR,
  ICONS_VIEWER,
  VIEW_SIZE_DISPLAY,
  EXPERIMENTAL_TAB,
];
