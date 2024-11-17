import { Input } from "antd";
import React, { useState, useEffect } from "react";

const Search: React.FC<{ handleFilter: any }> = ({ handleFilter }) => {
    const [query, setQuery] = useState("");
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
            handleFilter(debouncedQuery);
        }
    }, [debouncedQuery]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return <Input placeholder="Search user" onChange={handleChange} style={{ width: 200 }} />;
};

export default Search;
