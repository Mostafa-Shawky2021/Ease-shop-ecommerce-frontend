import { Row } from 'react-bootstrap';
const GridList = ({ data, renderItem }) => {
    return <Row>
        {data?.map(item => renderItem(item))}
    </Row>
}
export default GridList;