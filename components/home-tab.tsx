"use client"

import { ReactNode, useState } from "react"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Products from "./products"

type HomeTabProps = {
  defaultValue?: string
  items?: Array<{ title: string; key: string; children: ReactNode }>
}

const TAB_ITEMS = [
  {
    key: "#지포",
    title: "#지포",
    children: <Products />,
  },
  {
    key: "#레더맨",
    title: "#레더맨",
    children: <Products />,
  },
  {
    key: "#클린켄틴",
    title: "#클린켄틴",
    children: <Products />,
  },
  {
    key: "#오피넬",
    title: "#오피넬",
    children: <Products />,
  },
  {
    key: "#날진",
    title: "#날진",
    children: <Products />,
  },
]

export function HomeTab({ items = TAB_ITEMS, defaultValue }: HomeTabProps) {
  const [currentTab, setCurrentTab] = useState<string>(
    defaultValue || items[0].key
  )

  const hanldeTab = (value: string) => {
    setCurrentTab(value)
  }

  const renderProducts = () => {
    return items.find((item) => item.key === currentTab)?.children
  }

  return (
    <div className="mt-[30px]">
      <div className="flex justify-center">
        <ul className="flex gap-4">
          {items.map(({ key, title }) => (
            <li key={key} className="group">
              <button
                className={cn(
                  "h-[38px] w-[120px] group-hover:bg-gray-500 group-hover:text-white rounded-[20px]",
                  currentTab === key ? "bg-gray-500 text-white" : "bg-gray-300"
                )}
                onClick={() => hanldeTab(key)}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10">{renderProducts()}</div>
    </div>
  )
}
