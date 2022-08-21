import React from 'react'

import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';

export default ({ children, onClick, tip, style, tipClassName }) => (
    <Tooltip title={tip} className={tipClassName} placement="top">
        <IconButton onClick={onClick} style={style}>
            {children}
        </IconButton>
    </Tooltip>
);
