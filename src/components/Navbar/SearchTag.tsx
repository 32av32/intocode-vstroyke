import React, {useEffect, useState} from 'react';
import {alpha, InputBase, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useAppDispatch} from "../../hooks";
import {getAds} from "../../createActions/adsActions";
import {SearchContext} from "../../App";

const SearchTag = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.8),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '30ch',
            '&:focus': {
                width: '40ch',
                outline: '1px solid #ff9100',
                borderRadius: '3px',
            },
        },
    },
}));

const Search = () => {
    const {setSearchValue} = React.useContext(SearchContext)
    const [value, setValue] = useState('')

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value)
        if (setSearchValue) {
            setSearchValue(e.target.value)
        }
    }

    return (
        <SearchTag>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder='Поиск…'
                value={value}
                onChange={e => handleChangeInput(e)}
            />
        </SearchTag>
    );
};

export default Search;