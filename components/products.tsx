import Image from "next/image"

type ProductType = {
  title: string
  price: string
  imageSrc: any
}

export default function Products() {
  const productList: ProductType[] = [
    {
      title: "[사은품] zippo 270 high Polish",
      price: "53,000원",
      imageSrc: require("public/images/product_1.svg"),
    },
    {
      title: "[사은품] zippo 270 high Polish",
      price: "53,000원",
      imageSrc: require("public/images/product_2.svg"),
    },
    {
      title: "[사은품] zippo 270 high Polish",
      price: "53,000원",
      imageSrc: require("public/images/product_2.svg"),
    },
    {
      title: "[사은품] zippo 270 high Polish",
      price: "53,000원",
      imageSrc: require("public/images/product_2.svg"),
    },
    {
      title: "[사은품] zippo 270 high Polish",
      price: "53,000원",
      imageSrc: require("public/images/product_2.svg"),
    },
    {
      title: "[사은품] zippo 270 high Polish",
      price: "53,000원",
      imageSrc: require("public/images/product_2.svg"),
    },
  ]
  return (
    <div className="flex flex-wrap gap-10">
      {productList.map((product) => (
        <ProductItem data={product} />
      ))}
    </div>
  )
}

const ProductItem = ({ data }: { data: ProductType }) => (
  <div className="flex flex-col gap-2 items-center">
    <Image layout="responsive" src={data.imageSrc} alt={data.title} />
    <h3>{data.title}</h3>
    <p className="font-bold">{data.price}</p>
  </div>
)
