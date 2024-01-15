"use client"

import "quill/dist/quill.snow.css"
import { forwardRef, useMemo, useRef } from "react"
import ReactQuill, { Quill } from "react-quill"

import { getFiles } from "@/lib/utils"

import { ICONS_EDITOR } from "./icons"

interface IEditor {
  name: string
  value?: string
  onChange?: (value: string) => void
  style?: React.CSSProperties
  placeholder?: string
}

const icons = Quill.import("ui/icons")
icons["bold"] = ICONS_EDITOR.FormatBold
icons["italic"] = ICONS_EDITOR.FormatItalic
icons["underline"] = ICONS_EDITOR.FormatUnderline
icons["strike"] = ICONS_EDITOR.FormatStrikeThrough
icons["image"] = ICONS_EDITOR.FormatFileImage
icons["link"] = ICONS_EDITOR.FormatLink
icons["align"][""] = ICONS_EDITOR.FormatAlignLeft
icons["align"]["center"] = ICONS_EDITOR.FormatAlignCenter
icons["align"]["right"] = ICONS_EDITOR.FormatAlignRight
icons["list"]["bullet"] = ICONS_EDITOR.FormatListOutline
icons["code"] = ICONS_EDITOR.FormatCode
icons["undo"] = ICONS_EDITOR.FormatArrowUndo
icons["redo"] = ICONS_EDITOR.FormatArrowRedo

const toolbarOptions = ["14px", "16px", "18px", "20px"]

const Editor = forwardRef(({ name, ...props }: IEditor, ref) => {
  const quillRef = useRef<any>()

  const imageHandler = async () => {
    const files = ((await getFiles(undefined, true)) as File[]) || []
    const formData = new FormData()
    const quillObj = quillRef.current?.getEditor()
    const range = quillObj?.getSelection()
    const filesPromise = files.map(
      (file) =>
        new Promise(async (resolve, reject) => {
          try {
            formData.append("file", file as File)
            formData.append("upload_preset", "vuong_preset")
            const res = await fetch(
              "https://api.cloudinary.com/v1_1/decerwuo3/upload",
              {
                method: "POST",
                body: formData,
              }
            )
            const data = await res.json()
            resolve(data.url)
          } catch (error) {
            reject("Something went wrong! Please contact to the admin.")
          }
        })
    )
    const images = (await Promise.all(filesPromise)) || []
    for (const image of images.reverse()) {
      if (image) {
        quillObj?.insertEmbed(range?.index || 0, "image", image)
        quillObj?.setSelection(quillObj.getLength(), 0)
      }
    }
  }

  // Undo and redo functions for Custom Toolbar
  function undoChange() {
    const editor = quillRef.current?.getEditor()
    editor?.history?.undo()
  }
  function redoChange() {
    const editor = quillRef.current?.getEditor()
    editor?.history?.redo()
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: toolbarOptions }], // custom dropdown
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["image", "link"],
          // [{ header: 1 }, { header: 2 }], // custom button values
          [{ align: [] }, { align: ["center"] }, { align: ["right"] }],
          [{ list: "bullet" }, "code"],

          ["undo", "redo"],
        ],
        handlers: {
          image: imageHandler,
          undo: undoChange,
          redo: redoChange,
        },
      },
    }
  }, [])

  return (
    <ReactQuill
      className="[&>div:last-of-type]:min-h-[300px] [&>div:last-of-type]:max-h-[500px] [&>div:last-of-type]:overflow-y-auto"
      theme="snow"
      ref={quillRef}
      modules={modules}
      {...props}
    />
  )
})

Editor.displayName = "Editor"

export default Editor
