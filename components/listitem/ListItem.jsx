import React from 'react'

function ListItem({ renderItem, data }) {

    return data?.map(item => renderItem(item))
}

export default ListItem;

