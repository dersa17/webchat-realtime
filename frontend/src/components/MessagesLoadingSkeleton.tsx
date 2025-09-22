import { Skeleton } from "./ui/skeleton"

const MessagesLoadingSkeleton = () => {
  return (
    
    <div className="max-w-5xl mx-auto space-y-4">
      {[...Array(6)].map((_, index) => {
        const isLeft = index % 2 === 0; // bubble kiri/kanan gantian
        return (
          <div
            key={index}
            className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs shadow-sm ${
                isLeft ? "bg-gray-100" : "bg-indigo-500/70"
              }`}
            >
              <Skeleton className="h-5 w-[120px] rounded-2xl mb-2 " />
              <Skeleton className="h-3 w-10 rounded-md" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MessagesLoadingSkeleton
