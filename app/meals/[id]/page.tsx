import React from 'react';

type Prop = {params: {id: string}}

const MealDetailPage = ({params}: Prop) => {
    return (
        <div>Detail - {params.id}</div>
    );
};

export default MealDetailPage;