import React from 'react'

export function List({ renderItem, data }) {
    return data?.map(item => renderItem(item))
}
