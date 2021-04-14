import SQLBuilder from '../../utils/SQLBuilder';
import { fillColorDB, updateAllColorsDB } from '../../utils/colorDBUtils';
import { TABLE_COLORS } from '../../configs/tableConfigs';

export const COLORS_INIT = 'colors:initialize';
export const COLORS_LOAD = 'colors:load';
export const COLORS_LOAD_FINISHED = 'colors:load:finished:success';
export const COLORS_LOAD_ERROR = 'colors:load:finished:error';
export const COLORS_UPDATE = 'colors:update';

// eslint-disable-next-line no-unused-vars
export const loadColors = () => (dispatch, getState) => {
  dispatch({
    type: COLORS_LOAD,
    payload: {},
  });
  SQLBuilder.selectFromTable(TABLE_COLORS.name)
    .then(((response) => {
      dispatch({
        type: COLORS_LOAD_FINISHED,
        payload: response.rows._array,
      });
    }))
    .catch((error) => {
      fillColorDB();
      dispatch({
        type: COLORS_LOAD_ERROR,
        payload: error,
      });
    });
};

export const updateColors = (payload) => {
  const { config } = payload;
  const obj = {
    type: COLORS_UPDATE,
    payload: {},
  };
  updateAllColorsDB(config);
  Object.keys(config).forEach((key) => {
    obj.payload = { ...obj.payload, [key]: config[key] };
    // if (config[key].color !== '') updateColorDB(key, config[key].color);
  });
  return obj;
};
