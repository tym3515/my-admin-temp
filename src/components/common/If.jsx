import React from 'react';

function If(props) {
    const condition = props.condition || false;
    // const positive = props.then || null;
    // const negative = props.else || null;
    return condition ? <>
        {children}
    </> : negative;

    return (<>

    </>);
}

export default If;
