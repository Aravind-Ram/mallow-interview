import React from 'react';
import { Pagination as AntPagination } from 'antd';
import { IUser } from '../interfaces/IUser';

const Pagination: React.FC<IUser.Pagination> = ({
  perPage,
  total,
  current,
  onPageSwitch,
}) => {
  return (
    <AntPagination
      defaultPageSize={perPage}
      current={current}
      defaultCurrent={1}
      total={total}
      onChange={(page) => onPageSwitch(page)}
    />
  );
};

export default Pagination;
