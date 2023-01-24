import React from 'react'

function List({ renderItem, data }) {
    return data?.map(item => renderItem(item))
}

export default List;

