import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Icons } from "@/components/icons"

export default function OrderForm() {
  const fields = [
    {
      label: "아이디",
      name: "아이디",
      render: <Input />,
      required: true,
    },
    {
      label: "비밀번호",
      name: "비밀번호",
      render: <Input className="w-[150px]" />,
      required: true,
    },
    {
      label: "비밀번호 확인",
      name: "비밀번호 확인",
      render: <Input className="w-[150px]" />,
      required: true,
    },
    {
      label: "이름",
      name: "이름",
      render: <Input />,
      required: true,
    },
    {
      label: "이메일",
      name: "이메일",
      render: (
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <Input className="basis-[70%]" />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Checkbox id="1" />
            <label
              htmlFor="1"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              정보/이벤트 메일 수신에 동의합니다.
            </label>
          </div>
        </div>
      ),
      required: true,
    },
    {
      label: "휴대폰번호",
      name: "휴대폰번호",
      render: (
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <Input className="basis-[190px]" placeholder="- 없이 입력하세요." />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Checkbox id="2" />
            <label
              htmlFor="2"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              정보/이벤트 SMS 수신에 동의합니다.
            </label>
          </div>
        </div>
      ),
      required: true,
    },
    {
      label: "전화번호",
      name: "전화번호",
      render: <Input placeholder="- 없이 입력하세요." />,
    },
    {
      label: "주소",
      name: "주소",
      render: (
        <div className="flex flex-col gap-4">
          <div className="flex gap-1">
            <Input className="basis-[190px]" />
            <Button variant="outline" className="max-h-8 rounded-none text-xs">
              우편번호검색
            </Button>
          </div>
          <Input />
          <Input />
        </div>
      ),
      required: true,
    },
  ]

  return (
    <>
      <Table className="border-t-0">
        <TableBody>
          {fields.map((field) => (
            <TableRow
              key={field.label}
              className="hover:bg-white max-h-16 [&>td_input]:h-8 [&>td_input]:placeholder:text-xs [&>td>*]:max-w-[80%]"
            >
              <TableCell
                width="20%"
                className="bg-gray-100 text-xs font-bold border"
              >
                <div className="flex items-center gap-1">
                  {field.required && <Icons.Aterisk size={12} />}
                  {field.label}
                </div>
              </TableCell>
              <TableCell className=" border text-xs text-gray-600">
                {field.render}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-8 flex flex-col gap-8">
        <div className="p-8 flex gap-2 justify-end text-xl border">
          Total <b>137,000원</b>
        </div>
        <div className="flex gap-2 items-center justify-center text-sm">
          <Checkbox id="0" />
          <label
            htmlFor="0"
            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            정보/이벤트 메일 수신에 동의합니다.
          </label>
        </div>
        <Button
          // variant="outline"
          className="rounded-none w-[190px] block mx-auto"
        >
          Submit
        </Button>
      </div>
    </>
  )
}
