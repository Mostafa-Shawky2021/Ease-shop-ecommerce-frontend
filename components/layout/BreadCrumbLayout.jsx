import { Breadcrumb, Container } from "react-bootstrap";

import style from "./breadcrumblayout.module.scss";

const BreadCrumbLayout = ({ data }) => {
  const renderItem = data?.map((item, index) => {
    const activeItem = item.active ? style.active : "";
    return (
      <Breadcrumb.Item
        key={index}
        className={`${activeItem} ${style.item}`}
        href={item.link ? item.link : ""}
      >
        {item.label}
      </Breadcrumb.Item>
    );
  });
  return (
    <Breadcrumb
      className={style.breadCrumbLayout}
      listProps={{ style: { marginBottom: "0px" } }}
    >
      <Container fluid="xl" className="d-flex">
        {renderItem}
      </Container>
    </Breadcrumb>
  );
};
export default BreadCrumbLayout;
