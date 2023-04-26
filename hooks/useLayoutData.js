import { useQuery } from '@tanstack/react-query';

import { fetchLayout } from '@root/queries';

import { queryKeys } from 'data';

const useLayoutData = () => useQuery(queryKeys.LAYOUT, fetchLayout)

export default useLayoutData