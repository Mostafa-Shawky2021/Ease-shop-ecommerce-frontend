function ListItem({ renderItem, data }) {
	return data?.map((item) => renderItem(item));
}

export default ListItem;
