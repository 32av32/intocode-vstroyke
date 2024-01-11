import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#ffda33',
        },
        secondary: {
            main: '#232323',
        },
    },
});

export const BoxModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #232323',
    boxShadow: 24,
    borderRadius: '10px'
};
