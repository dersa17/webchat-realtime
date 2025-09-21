import { Skeleton } from "@/components/ui/skeleton"

const UserLoadingSkeleton = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="p-4 rounded-lg animate-pulse flex items-center space-x-4"
        >
          {/* Avatar */}
          <Skeleton className="h-12 w-12 rounded-full" />

          {/* Text skeleton */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserLoadingSkeleton
