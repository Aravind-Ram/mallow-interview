import { Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { filterUsers } from '../app/usersSlice';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query); // Update debouncedQuery after delay
    }, 500); // Adjust delay as needed

    return () => {
      clearTimeout(handler); // Cleanup on each render
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(filterUsers(debouncedQuery));
    } else {
      dispatch(filterUsers('')); // Dispatch action to fetch all users when query is empty
    }
  }, [debouncedQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Input
      placeholder="Search user"
      onChange={handleChange}
      style={{ width: 200 }}
    />
  );
};

export default Search;
