import React from 'react';
import { shallow } from 'enzyme';
import SortableHeaderCell, { Props } from '../SortableHeaderCell';
import { HeaderRowType, DEFINE_SORT } from '../../../enums';
import { Column } from '../../../types';

describe('<SortableHeaderCell/>', () => {
  const setup = (overrideProps?: Partial<Props>, overrideColumn?: Partial<Column>) => {
    const props: Props = {
      column: {
        idx: 0,
        name: 'col1',
        key: 'col1',
        width: 100,
        left: 0,
        ...overrideColumn
      },
      rowType: HeaderRowType.HEADER,
      onSort: jest.fn(),
      sortDirection: DEFINE_SORT.NONE,
      sortDescendingFirst: false,
      ...overrideProps
    };
    const wrapper = shallow(<SortableHeaderCell {...props} />);
    return { wrapper, props };
  };

  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('should toggle sort direction when clicked', () => {
    const { wrapper, props } = setup();
    wrapper.simulate('click');
    expect(props.onSort).toHaveBeenCalledWith(props.column.key, DEFINE_SORT.ASC);
  });

  describe('When sortDescendingFirst is true', () => {
    it('should set sort descending first when clicked', () => {
      const { wrapper, props } = setup({ sortDescendingFirst: true });
      wrapper.simulate('click');
      expect(props.onSort).toHaveBeenCalledWith(props.column.key, DEFINE_SORT.DESC);
    });
  });

  describe('When headerRenderer of column is set', () => {
    it('should render the header renderer', () => {
      const HeaderRenderer = () => <span>Custom</span>;
      const { wrapper } = setup({}, { headerRenderer: <HeaderRenderer /> });
      expect(wrapper.find(HeaderRenderer).length).toBe(1);
    });
  });
});
