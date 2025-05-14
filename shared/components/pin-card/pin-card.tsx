import { MapPin } from "lucide-react"
import { Link } from "../link/Link"
import { Pin } from "@/(domains)/pin/models/pin.model"
import { wrapLink } from "@/shared/lib/helpers/wrap-link"

export function PinCard({
  fullImage, title, meta, id
}: Pin) {
  return (
    <Link
      href={wrapLink(id, "pin")}
      className="relative group mb-4 overflow-hidden transition-all duration-200 group"
    >
      <div className="relative w-full rounded-xl overflow-hidden cursor-pointer aspect-auto">
        <img
          src={fullImage}
          alt={title.slice(0, 8) + '...'}
          width={400}
          height={400}
          className="w-full object-cover transition-transform rounded-xl"
        />
        <div className="absolute inset-0 bg-black/20 transition-opacity duration-150 group-hover:opacity-100 opacity-0">
          <div className="absolute flex flex-col items-start justify-between p-4 inset-0">
            <div className="flex items-center justify-between w-full mb-2">
              {(meta && meta.location) && (
                <div className="flex items-center gap-1 px-2 py-1 text-sm bg-foreground/90 rounded-full">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs text-foreground invert">{meta.location.addressName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}