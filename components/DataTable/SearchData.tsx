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

interface SearchDataProps {
  handleSearch: (value: string) => void;
  handleAdd?: () => void;
  isAdd?: boolean;
}

export default function SearchData({
  handleSearch,
  handleAdd,
  isAdd = false,
}: SearchDataProps) {
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchQuery(value);
    handleSearch(value);
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
        sx={{ width: 260 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: searchQuery ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClearSearch}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />

      {isAdd && handleAdd && (
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{
            backgroundColor: "#fd7e14",
            "&:hover": { backgroundColor: "#e96d0a" },
          }}
        >
          Add
        </Button>
      )}
    </Box>
  );
}
