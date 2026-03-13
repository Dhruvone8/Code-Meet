import { Trophy, Users } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount, isLoading }) {
  if (isLoading) {
    return (
      <div className="lg:col-span-1 grid grid-cols-1 gap-6">
        <div className="card bg-base-100 border-2 border-primary/20">
          <div className="card-body">
            <div className="skeleton h-20 w-full"></div>
          </div>
        </div>
        <div className="card bg-base-100 border-2 border-secondary/20">
          <div className="card-body">
            <div className="skeleton h-20 w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-6">
      {/* Active Count */}
      <div className="card bg-base-100 border-2 border-primary/20 hover:border-primary/40">
        <div className="card-body">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <div className="badge badge-primary">Live</div>
          </div>
          <div className="text-4xl font-black mb-1">{activeSessionsCount}</div>
          <div className="text-sm opacity-60">Active Sessions</div>
        </div>
      </div>

      {/* Recent Count */}
      <div className="card bg-base-100 border-2 border-secondary/20 hover:border-secondary/40">
        <div className="card-body">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-secondary/10 rounded-2xl">
              <Trophy className="w-7 h-7 text-secondary" />
            </div>
          </div>
          <div className="text-4xl font-black mb-1">{recentSessionsCount}</div>
          <div className="text-sm opacity-60">Sessions Completed</div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;