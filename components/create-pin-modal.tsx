import type React from "react"
import { useState, useRef } from "react"
import { X, Upload, Link2 } from "lucide-react"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Textarea } from "@/ui/textarea"
import { Label } from "@/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"

type CreatePinModalProps = {
  onClose: () => void
}

export function CreatePinModal({ onClose }: CreatePinModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    const file = e.dataTransfer.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden max-h-[90vh] shadow-2xl">
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
          <X className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold">Create Pin</h2>
        <Button className="rounded-full bg-rose-600 hover:bg-rose-700">Save</Button>
      </div>
      <div className="p-6 overflow-y-auto max-h-[calc(90vh-60px)]">
        <div className="grid md:grid-cols-2 gap-6">
          <div
            className="bg-gray-100 rounded-lg min-h-[300px] flex flex-col items-center justify-center p-4 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              <div className="relative w-full h-full min-h-[300px]">
                <img src={imagePreview || "/placeholder.svg"} alt="Pin preview" className="object-contain" />
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 text-gray-400 mb-4" />
                <p className="text-gray-600 text-center mb-2">Drag and drop or click to upload</p>
                <p className="text-gray-400 text-sm text-center">
                  Recommendation: Use high-quality .jpg files less than 20MB
                </p>
              </>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="board">Save to</Label>
              <Select>
                <SelectTrigger id="board">
                  <SelectValue placeholder="Select a board" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home Inspiration</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="food">Food & Recipes</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Add a title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell everyone what your Pin is about"
                className="resize-none"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Add a destination link</Label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input id="link" placeholder="Add a link" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="Add tags separated by commas" />
              <p className="text-xs text-gray-500">Tags help your Pin get discovered by more people</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}