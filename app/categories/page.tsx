import Pagination from "@/components/pagination"
import Products from "@/components/products"

export default function IndexPage() {
  return (
    <div className="flex w-full flex-col">
      <div className="container mt-[50px]">
        <Products size={3} />
        <Pagination />
      </div>
    </div>
  )
}
