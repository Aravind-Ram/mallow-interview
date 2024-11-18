import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Button } from 'antd';

interface Prop {
  onPageSwitch: any;
}

const ClientPagination: React.FC<Prop> = ({ onPageSwitch }) => {
  const dispatch = useAppDispatch();
  const { collection } = useAppSelector((state) => state.users);

  return (
    <div>
      {collection ? (
        <div>
          {Array.from(
            {
              length: Math.ceil(collection?.total / collection?.per_page),
            },
            (_, index) => (
              <Button
                key={index}
                onClick={() => dispatch(onPageSwitch(index + 1))}
                disabled={collection.page === index + 1}
              >
                {index + 1}
              </Button>
            ),
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ClientPagination;
