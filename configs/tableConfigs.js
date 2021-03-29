export const TABLE_COLORS = {
  name: 'table_colors',
  primaryKey: { name: 'id', type: 'integer' },
  attributes: [
    { name: 'fieldName', type: 'text' },
    { name: 'color', type: 'text' },
  ],
  foreignKeys: [],
};

export const TABLE_TEXT_COLORS = {
  name: 'table_text_colors',
  primaryKey: {
    name: 'id',
    type: 'integer',
  },
  attributes: [
    { name: 'textColor', type: 'text' },
  ],
};

export const TABLE_BOX_COLORS = {
  name: 'table_box_colors',
  primaryKey: {
    name: 'id',
    type: 'integer',
  },
  attributes: [
    { name: 'boxColor', type: 'text' },
  ],
};

export const TABLE_WIDTHS = {
  name: 'table_widths',
  primaryKey: {
    name: 'id',
    type: 'integer',
  },
  attributes: [
    { name: 'width', type: 'text' },
  ],
};

export const TABLE_TEXTS = {
  name: 'table_texts',
  primaryKey: {
    name: 'id',
    type: 'integer',
  },
  attributes: [
    { name: 'text', type: 'text' },
  ],
};

export const TABLE_LINES = {
  name: 'table_lines',
  primaryKey: {
    name: 'id',
    type: 'integer',
  },
  attributes: [
    { name: 'lineNumber', type: 'integer' },
    { name: 'textColorId', type: 'integer' },
    { name: 'boxColorId', type: 'integer' },
    { name: 'widthsId', type: 'integer' },
    { name: 'textsId', type: 'integer' },
  ],
  foreignKeys: [
    { name: 'textColorId', tableReference: TABLE_TEXT_COLORS.name, attributeReference: TABLE_TEXT_COLORS.primaryKey.name },
    { name: 'boxColorId', tableReference: TABLE_BOX_COLORS.name, attributeReference: TABLE_BOX_COLORS.primaryKey.name },
    { name: 'widthsId', tableReference: TABLE_WIDTHS.name, attributeReference: TABLE_WIDTHS.primaryKey.name },
    { name: 'textsId', tableReference: TABLE_TEXTS.name, attributeReference: TABLE_TEXTS.primaryKey.name },
  ],
};
