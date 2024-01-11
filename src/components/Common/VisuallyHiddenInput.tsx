import React from 'react';
import {styled} from "@mui/material";

const VisuallyHiddenInputComponent = ({ name }: { name: string }) => {
    const VisuallyHiddenInput = styled('input')({
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return <VisuallyHiddenInput type="file" name={name} />
};

export default VisuallyHiddenInputComponent;