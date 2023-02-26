const useFilter = () => {

    /*
    ** url RequestFilter will be the uri which will be send to the backend to apply filter
    */
    const applyFilter = (filterRules, urlRequestFilter) => {

        const urlSearchParams = new URLSearchParams()

        Object.entries(filterRules).forEach(([filterKey, Filtervalue]) => {
            if (Filtervalue.length > 0) {
                urlSearchParams.set(filterKey, encodeURIComponent(Filtervalue.join('-')));
            }
        });

        const urlSearchParamsToString = urlSearchParams.toString();

        const filterUrl = `${urlRequestFilter}?page=${pageNumber}&${urlSearchParamsToString}`;

        router.push(filterUrl, undefined, { shallow: true });
    }

}

export default useFilter;