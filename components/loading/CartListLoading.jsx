import Skeleton from '@mui/material/Skeleton';

const CartListLoading = () => {
    return (
        <div style={{ marginTop: '1rem', height: '220px', padding: '0.5rem 1rem 0.95rem' }}>
            <div className='d-flex justify-content-between'>
                <div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <Skeleton variant="text" width={80} height={30} />
                        <Skeleton variant="text" width={220} height={30} />
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <Skeleton variant="text" width={80} height={30} />
                        <Skeleton variant="text" width={50} height={30} />
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <Skeleton variant="text" width={80} height={30} />
                        <Skeleton variant="text" width={50} height={30} />
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <Skeleton variant="text" width={130} height={30} />
                        <Skeleton variant="text" width={80} height={30} />
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <Skeleton variant="text" width={130} height={30} />
                        <Skeleton variant="text" width={80} height={30} />
                    </div>
                    <div style={{ display: 'flex', gap: '5px', marginTop: '1rem' }}>
                        <Skeleton variant="rectangular" width={40} height={30} />
                        <Skeleton variant="rectangular" width={30} height={30} />
                        <Skeleton variant="rectangular" width={30} height={30} />
                    </div>
                </div>
                <div>
                    <Skeleton variant="rectangular" width={60} height={70} />
                </div>
            </div>
        </div>
    )
}

export default CartListLoading