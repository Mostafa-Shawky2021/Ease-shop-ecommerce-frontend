
import { useState, useEffect } from 'react';

import { useRouter } from "next/router";

const useFilter = (pageNumber, dynamicRoute = null, additionalQuery = null) => {

    const [filterRules, setFilterRules] = useState({
        price: [50, 10000],
        sizes: [],
        colors: [],
        brands: [],
    });

    const router = useRouter();

    useEffect(() => {

        const queryFilter = router.query;

        const filterRulesQueries = {};

        (queryFilter.price)
            ? filterRulesQueries.price = queryFilter.price.split('-').map((price) => Number(price))
            : null;
        (queryFilter.sizes) ? filterRulesQueries.sizes = queryFilter.sizes.split('-') : null;
        (queryFilter.colors) ? filterRulesQueries.colors = queryFilter.colors.split('-') : null;
        (queryFilter.brands) ? filterRulesQueries.brands = queryFilter.brands.split('-') : null;

        setFilterRules((oldFilterRules) => ({ ...oldFilterRules, ...filterRulesQueries }));

    }, [setFilterRules, router]);

    /*
    ** url RequestFilter will be the uri which will be send to the backend to apply filter
    */

    const handleOnChangeInputFilter = inputName => (event) => {

        //convert sate key into array to check if incoming input is valid
        const stateFitlerRulesKeys = Object.keys(filterRules);
        if (!stateFitlerRulesKeys.includes(inputName)) {
            console.log('sorry this input name is not valid as state key');
            return false;
        }

        if (Array.isArray(event.target.value)) {
            setFilterRules({ ...filterRules, [inputName]: event.target.value });
            return true;
        }

        if (event.target.checked) {

            const filterData = [...filterRules[inputName], event.target.value]
            setFilterRules({ ...filterRules, [inputName]: filterData });
        } else {

            const filterDataFun = (inputValue) => inputValue !== event.target.value;
            // console.log(filterRules[inputName], event.target.value)
            const filteredData = filterRules[inputName].filter(filterDataFun)
            setFilterRules({ ...filterRules, [inputName]: filteredData });
        }

    }

    const applyFilter = () => {

        let FilterRuleQueryParam = { page: pageNumber };

        dynamicRoute && Object.assign(FilterRuleQueryParam, dynamicRoute)

        //Additional query if we need to build additional query string paramater beside state data
        if (additionalQuery) {

            Object.entries(additionalQuery).forEach(([filterKey, filterValue]) => {

                if (Array.isArray(filterValue)) {

                    FilterRuleQueryParam[filterKey] = filterValue.join('-');
                } else {

                    FilterRuleQueryParam[filterKey] = filterValue;
                }
            })
        }

        // build url filter according to state data
        Object.entries(filterRules).forEach(([filterKey, filterValue]) => {

            if (Array.isArray(filterValue) && filterValue.length > 0) {
                FilterRuleQueryParam[filterKey] = filterValue.join('-');
            }

        });

        router.push(
            {
                pathname: router.currentPath,
                query: FilterRuleQueryParam

            },
            undefined,
            { shallow: true }
        )

    }

    const resetFilter = () => {

        setFilterRules({
            price: [50, 10000],
            sizes: [],
            colors: [],
            brands: [],
        });

        let query = {}
        if (dynamicRoute) Object.assign(query, dynamicRoute);
        if (additionalQuery) Object.assign(query, additionalQuery);

        router.push(
            { pathname: router.pathname, query },
            undefined,
            { shallow: true });
    }

    return {
        applyFilter,
        resetFilter,
        handleOnChangeInputFilter,
        filterRules,
        setFilterRules,
    }
}

export default useFilter;