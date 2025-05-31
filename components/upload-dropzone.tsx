"use client"

import { useRef, useState, useCallback } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UploadDropzoneProps {
  onFilesSelected: (files: File[]) => void
}

export default function UploadDropzone({ onFilesSelected }: UploadDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    onFilesSelected(droppedFiles)
  }, [onFilesSelected])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    onFilesSelected(selectedFiles)
  }, [onFilesSelected])

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
        isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
      <h3 className="text-lg font-medium mb-2">Drop files here to upload</h3>
      <p className="text-muted-foreground mb-4">or click the button below to browse files</p>
      <Button onClick={() => fileInputRef.current?.click()} className="mb-2">
        Browse Files
      </Button>
      <p className="text-xs text-muted-foreground">Supports all file types</p>

      <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} className="hidden" />
    </div>
  )
}
