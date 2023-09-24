"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
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

enum FIND_TYPE {
  EMAIL = "email",
  PHONE = "phone",
}

export default function IndexPage() {
  const [findType, setFindType] = useState<string>(FIND_TYPE.EMAIL)
  const handleChangeRadio = (value: string) => {
    setFindType(value)
  }

  return (
    <div className="container">
      <div className="p-5">
        <div className="mt-5 mb-10 ml-auto mr-auto min-w-[600px] w-[50%]">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-5">아이디찾기</h2>
            <div className="p-16 border">
              <h3 className="text-lg">회원 아이디찾기</h3>
              <RadioGroup value={findType} className="flex flex-row my-[10px]">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={FIND_TYPE.EMAIL}
                    onClick={() => handleChangeRadio(FIND_TYPE.EMAIL)}
                    id="findByEmail"
                  />
                  <Label className="text-xs !ml-1" htmlFor="findByEmail">
                    이메일
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={FIND_TYPE.PHONE}
                    onClick={() => handleChangeRadio(FIND_TYPE.PHONE)}
                    id="findByPhone"
                  />
                  <Label className="text-xs !ml-1" htmlFor="findByPhone">
                    휴대폰번호
                  </Label>
                </div>
              </RadioGroup>
              <div className="flex gap-4">
                <div className="flex flex-col mt-4 gap-4 basis-[74%]">
                  <Input
                    className="rounded-none text-xs"
                    name="userName"
                    placeholder="이름"
                  />
                  {findType === FIND_TYPE.EMAIL ? (
                    <div className="flex gap-2">
                      <Input
                        className="rounded-none basis-[50%] text-xs"
                        name="email"
                        placeholder="가입휴대폰번호"
                      />
                      <div className="basis-[40%]">
                        <Select>
                          <SelectTrigger className="rounded-none text-xs">
                            <SelectValue placeholder="직접입력" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="naver.com">
                                naver.com
                              </SelectItem>
                              <SelectItem value="hanmail.net">
                                hanmail.net
                              </SelectItem>
                              <SelectItem value="daum.net">daum.net</SelectItem>
                              <SelectItem value="hotmail.com">
                                hotmail.com
                              </SelectItem>
                              <SelectItem value="gmail.com">
                                gmail.com
                              </SelectItem>
                              <SelectItem value="icloud.com">
                                icloud.com
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : (
                    <Input
                      className="rounded-none text-xs"
                      name="phone"
                      placeholder="가입휴대폰번호"
                    />
                  )}
                  <Select />
                </div>
                <div className="pt-4 flex-1">
                  <Button className="rounded-none h-full w-full font-bold bg-stone-800 text-base">
                    로그인
                  </Button>
                </div>
              </div>

              <Separator className="mt-12 mb-5" />
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  className="w-[150px] h-[45px] rounded-none font-bold"
                  asChild
                >
                  <Link href="/find-password">비밀번호 찾기</Link>
                </Button>

                <Button
                  className="h-[45px] w-[150px] rounded-none bg-stone-600 font-bold"
                  asChild
                >
                  <Link href="/login">로그인하기</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
