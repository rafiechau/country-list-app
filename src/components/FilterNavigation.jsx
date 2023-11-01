import React from 'react';
import { Box, TextField, Select, MenuItem } from '@mui/material';

export default function FilterNavigation( { onChange, selectedRegion, handleRegionChange }) {
    return (
        <Box
          sx={{
            display: 'flex',  // Untuk menyusun anak-anak dalam baris
            justifyContent: 'space-between', // Untuk memisahkan anak-anak
            alignItems: 'center', // Untuk menyelaraskan anak-anak secara vertikal
            padding: '0',  // Padding pada tepi kiri dan kanan
            marginBottom: 2,
            margin: '0 auto', // Margin otomatis untuk kiri dan kanan
            width: '90%',
            flexDirection: { xs: 'column', sm: 'row' }, // Ubah flexDirection menjadi column untuk xs dan row untuk sm
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', sm: 500 }, // Ubah lebar menjadi 100% untuk xs dan 500 untuk sm
              maxWidth: '100%',
              marginRight: { sm: 2 },
            }}
          >
            <TextField 
              fullWidth 
              label="Search for a country..." 
              id="fullWidth" 
              onChange={(e) => onChange(e.target.value)}
            />
          </Box>
          
          {/* Region Filter */}
          <Box
              sx={{
              width: { xs: '100%', sm: 'auto' }, // Ubah lebar menjadi 100% untuk xs dan auto untuk sm
            }}
          >
            <Select value={selectedRegion} onChange={handleRegionChange}>
              <MenuItem value="All">Filter By Region</MenuItem>
              <MenuItem value="Africa">Africa</MenuItem>
              <MenuItem value="Americas">America</MenuItem>
              <MenuItem value="Asia">Asia</MenuItem>
              <MenuItem value="Europe">Europe</MenuItem>
              <MenuItem value="Oceania">Oceania</MenuItem>
            </Select>
          </Box>
        </Box>
      );
}
