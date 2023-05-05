import { useState } from "react";

import { useRouter } from "next/router";

const useSearch = (setSearchModal) => {
	const [searchValue, setSearchValue] = useState("");

	const { push } = useRouter();

	const handleOnInputChange = (event) => setSearchValue(event.target.value);

	const handleOnSubmitSearch = (event) => {
		if (!searchValue.trim().length) return false;
		if (event.type === "keypress" && event.key === "Enter") {
			setSearchModal && setSearchModal(false);
			submitSearch();
		} else if (event.type === "click") {
			setSearchModal && setSearchModal(false);
			submitSearch();
		}
	};
	const submitSearch = () => {
		push(
			{
				pathname: "/products",
				query: { productname: searchValue },
			},
			undefined,
			{ shallow: true }
		);
	};

	return {
		searchValue,
		handleOnSubmitSearch,
		handleOnInputChange,
	};
};

export default useSearch;
