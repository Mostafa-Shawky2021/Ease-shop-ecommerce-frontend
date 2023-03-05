
import { useRouter } from "next/router";

const useFilter = (pageNumber) => {

    const router = useRouter()
    /*
    ** url RequestFilter will be the uri which will be send to the backend to apply filter
    */
    const applyFilter = (filterRules, urlRequestFilter, additionalQueryFilter) => {

        const urlSearchParams = new URLSearchParams()

        //check if additionalquery paramater contain query filter key,value
        if (additionalQueryFilter) {

            const { queriesFilter } = additionalQueryFilter;

            Object.entries(queriesFilter).forEach(([filterKey, filterValue]) => {

                if (filterValue) {
                    urlSearchParams.set(filterKey, encodeURIComponent(filterValue));
                }
                else if (Array.isArray(filterValue) && filterValue.length > 0) {
                    urlSearchParams.set(filterKey, encodeURIComponent(filterValue.join()));
                } else {
                    urlSearchParams.set(filterKey, encodeURIComponent(filterValue));
                }
            })

        }
        // build url filter according to state data
        Object.entries(filterRules).forEach(([filterKey, filterValue]) => {

            if (Array.isArray(filterValue) && filterValue.length > 0) {
                urlSearchParams.set(filterKey, encodeURIComponent(filterValue.join('-')));
            }

        });

        const urlSearchParamsToString = urlSearchParams.toString();

        const filterUrl = `${urlRequestFilter}?${urlSearchParamsToString}&page=${pageNumber}`;

        router.push(filterUrl, undefined, { shallow: true });
    }

    const resetFilter = (setFilterRules, uriDefaultRequest) => {
        setFilterRules({
            price: [50, 10000],
            sizes: [],
            colors: [],
        })
        router.push(uriDefaultRequest, undefined, { shallow: false });
    }
    return {
        applyFilter,
        resetFilter
    }
}

export default useFilter;