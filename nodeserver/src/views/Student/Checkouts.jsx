import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import OrderListTable from "components/Tables/OrderListTable/OrderListTable";
import React from "react";

const Checkout = () => {
  return (
    <React.Fragment>
      <Card my="100px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">    
        <CardBody>
          <OrderListTable />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Checkout;
