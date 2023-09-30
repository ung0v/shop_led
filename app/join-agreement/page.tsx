"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Icons } from "@/components/icons"

export default function JoinAgreement() {
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
            <Select>
              <SelectTrigger className="basis-[30%] max-h-8 rounded-none text-xs">
                <SelectValue placeholder="직접입력" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="naver.com">naver.com</SelectItem>
                  <SelectItem value="hanmail.net">hanmail.net</SelectItem>
                  <SelectItem value="daum.net">daum.net</SelectItem>
                  <SelectItem value="hotmail.com">hotmail.com</SelectItem>
                  <SelectItem value="gmail.com">gmail.com</SelectItem>
                  <SelectItem value="icloud.com">icloud.com</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
    <div className="container mt-5">
      <div className="py-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">회원가입</h2>
          <div className="flex items-center">
            <span className="text-sm text-gray-300">
              <b>01</b> 약관동의
            </span>
            <span className="px-3">
              <Icons.ChevronRight />
            </span>
            <span className="text-sm">
              <b>02</b> 정보입력
            </span>
            <span className="px-3">
              <Icons.ChevronRight />
            </span>
            <span className="text-sm text-gray-300">
              <b>03</b> 가입완료
            </span>
          </div>
        </div>
        <Separator className="my-4 bg-stone-600" />
        <div className="py-16 px-14 text-sm">
          <h3 className="text-lg mb-4">회원종류</h3>
          <Separator className="bg-stone-600" />
          <div className="p-10 mb-5 flex items-center justify-center">
            <RadioGroup defaultValue="1" className="flex flex-row my-[10px]">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="findByEmail" />
                <Label className="text-xs !ml-1" htmlFor="findByEmail">
                  개인회원
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="">
            <div className="flex justify-between">
              <h3 className="text-lg">기본정보</h3>
              <span className="flex items-center gap-2 text-xs">
                <Icons.Aterisk size={12} /> 기본정보표시는 반드시 입력하셔야
                하는 항목입니다.
              </span>
            </div>
            <Separator className="bg-stone-600" />
          </div>
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
          <div className="mt-9 flex gap-2 justify-center [&>button]:w-[150px] [&>button]:h-[45px]">
            <Button variant="outline" className="rounded-none font-bold">
              취소
            </Button>
            <Button className="rounded-none font-bold bg-stone-800">
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
