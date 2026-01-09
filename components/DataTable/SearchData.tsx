"use client";
import React from "react";
import {
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchData = ({ handleSearch, handleAdd, isAdd = false }: any) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let textSearch = event.target.value;
    setSearchQuery(textSearch);
    handleSearch(textSearch);
  };
  const handleClearSearch = () => {
    setSearchQuery("");
    handleSearch("");
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {searchQuery && (
                <IconButton onClick={handleClearSearch} size="small">
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
      {isAdd && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#fd7e14",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#e96d0a",
            },
          }}
          onClick={handleAdd}
        >
          {" "}
          Add
        </Button>
      )}
    </Box>
  );
};

export default SearchData;
