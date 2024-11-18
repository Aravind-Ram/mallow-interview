import React from 'react';
import { Pagination as AntPagination } from 'antd';
import { IUser } from '../interfaces/IUser';
import { useAppDispatch } from '../app/hooks';

const Pagination: React.FC<IUser.Pagination> = ({
  perPage,
  total,
  current,
  onPageSwitch,
}) => {
  const dispatch = useAppDispatch();
  return (
    <AntPagination
      defaultPageSize={perPage}
      current={current}
      defaultCurrent={1}
      total={total}
      onChange={(page) => dispatch(onPageSwitch(page))}
    />
  );
};

export default Pagination;
