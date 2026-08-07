import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { uploadImage, type UploadFolder } from "@/lib/upload";
import { useUserId } from "@/hooks/use-session";
import { cn } from "@/lib/utils";

const MAX_BYTES = 8 * 1024 * 1024;

export function ImageUploader({
  folder,
  value,
  onChange,
  onFileSelected,
  label = "Add a photo",
  className,
  shape = "square",
}: {
  folder: UploadFolder;
  value?: string | null;
  onChange: (url: string | null) => void;
  onFileSelected?: (file: File) => void;
  label?: string;
  className?: string;
  shape?: "square" | "circle" | "portrait";
}) {
  const userId = useUserId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("That file isn't an image. Try a JPG or PNG.");
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error("That image is a bit large. Try one under 8MB.");
      return;
    }
    if (!userId) return;
    onFileSelected?.(file);
    setBusy(true);
    try {
      const { url } = await uploadImage(folder, userId, file);
      onChange(url);
    } catch {
      toast.error("We couldn't upload that photo. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        aria-label={label}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = "";
        }}
      />
      <div
        className={cn(
          "relative overflow-hidden border border-dashed border-border bg-card",
          shape === "circle" ? "size-24 rounded-full" : "rounded-md",
          shape === "square" && "aspect-square",
          shape === "portrait" && "aspect-[3/4]",
        )}
      >
        {value ? (
          <img src={value} alt="" className="size-full object-cover" />
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex size-full flex-col items-center justify-center gap-2 px-4 text-center text-sm text-muted-foreground transition-colors hover:bg-muted"
          >
            <ImagePlus className="size-5" aria-hidden="true" />
            {label}
          </button>
        )}

        {busy ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            <span className="sr-only">Uploading</span>
          </div>
        ) : null}

        {value && !busy ? (
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove photo"
            className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-card/90 backdrop-blur"
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {value && !busy ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-2 text-xs underline underline-offset-4"
        >
          Replace photo
        </button>
      ) : null}
    </div>
  );
}
