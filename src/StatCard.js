import React from 'react';


const StatCard = ( props ) => {
    
    return (
        <div style={{marginLeft:"50%"}}>
            { `Total Inspections: ${props.totalInspections}`}
        </div>
    )
};

export default StatCard;