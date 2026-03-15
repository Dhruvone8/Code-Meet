export const getDifficultyBadgeClass = (difficulty) => {
  if (!difficulty) return "badge-ghost";
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "badge-success";
    case "medium":
      return "badge-warning";
    case "hard":
      return "badge-error";
    default:
      return "badge-ghost";
  }
};

export const getDifficultyGlow = (difficulty) => {
  if (!difficulty) return "";
  switch (difficulty) {
    case "Easy":
      return "hover:border-green-400 hover:shadow-[0_0_5px_#22c55e,0_0_10px_#22c55e]";
    case "Medium":
      return "hover:border-yellow-400 hover:shadow-[0_0_5px_#facc15,0_0_10px_#facc15]";
    case "Hard":
      return "hover:border-red-400 hover:shadow-[0_0_5px_#ef4444,0_0_10px_#ef4444]";
    default:
      return "";
  }
};