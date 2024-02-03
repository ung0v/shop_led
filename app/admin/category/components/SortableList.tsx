import { Dispatch, useState } from "react"
import { arrayMoveImmutable } from "@/constants"
import { Category } from "@prisma/client"
import { cloneDeep } from "lodash"
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc"

import { Icons } from "@/components/icons"

const DragHandle = SortableHandle(() => <Icons.Grip />)

const SortableItem = SortableElement(({ name }) => (
  <li className="p-4 flex justify-between z-50 shadow bg-white">
    {name}
    <span className="p-2 cursor-row-resize focus-within:cursor-row-resize">
      <DragHandle />
    </span>
  </li>
))

const Container = SortableContainer(({ children }) => {
  return <ul className="flex flex-col gap-4">{children}</ul>
})

export const SortableList = ({
  items,
  onChange,
}: {
  items: any[]
  onChange: Dispatch<any[]>
}) => {
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    const oldItems = cloneDeep(items)
    const newItems = arrayMoveImmutable(items, oldIndex, newIndex).map(
      (item, idx) => ({ ...item, order: idx })
    )
    onChange(newItems)
  }

  return (
    <Container onSortEnd={onSortEnd} useDragHandle>
      {items.map((item, index) => (
        <SortableItem key={`item-${item.id}`} index={index} name={item.name} />
      ))}
    </Container>
  )
}
