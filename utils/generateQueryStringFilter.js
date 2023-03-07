const generateQueryStringFilter = (query) => {

    const urlSearchParams = new URLSearchParams();
    /*  
       ** extract the filter rules from the query string
       ** any request contain page number  we need to exclude it 
       ** from the uri so we avoid the repeating query string 
   */
    Object.entries(query).forEach(([key, value]) => {

        if (key !== 'page') urlSearchParams.set(key, encodeURIComponent(value));

    });
    return urlSearchParams.toString();
}

export default generateQueryStringFilter;