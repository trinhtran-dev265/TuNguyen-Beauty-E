import { useSearchParams } from "react-router";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

import OrderTable from "../../components/tables/BasicTables/OrderTable";
import AccountTable from "../../components/tables/BasicTables/AccountTable";

export default function BasicTables() {
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  return (
    <>
      <PageMeta
        title={type === "accounts" ? "Accounts" : "Orders"}
        description={
          type === "accounts" ? "Accounts Management" : "Orders Management"
        }
      />

      <PageBreadcrumb pageTitle={type === "accounts" ? "Accounts" : "Orders"} />

      <div className="space-y-6">
        <ComponentCard
          title={type === "accounts" ? "Account Table" : "Order Table"}
        >
          {type === "accounts" ? <AccountTable /> : <OrderTable />}
        </ComponentCard>
      </div>
    </>
  );
}
