import React from 'react';

import classes from './loading.module.css';

const MealsLoadingPage = () => (
    <p className={classes.loading}>Fetching meals...</p>
);

export default MealsLoadingPage;