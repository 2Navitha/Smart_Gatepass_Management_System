// src/components/AIHelper.js
export function getAISuggestion(reason) {
  const lowerReason = reason.toLowerCase();
  
  // Priority levels for different reasons
  const highPriority = ["emergency", "medical", "hospital", "accident", "urgent"];
  const mediumPriority = ["family", "exam", "interview", "college"];
  const lowPriority = ["shopping", "party", "movie", "personal"];
  
  // Check high priority first
  for (let word of highPriority) {
    if (lowerReason.includes(word)) {
      return { suggestion: "Approve", confidence: "High", reason: `Contains urgent keyword: "${word}"` };
    }
  }
  
  // Check medium priority
  for (let word of mediumPriority) {
    if (lowerReason.includes(word)) {
      return { suggestion: "Approve", confidence: "Medium", reason: `Contains important keyword: "${word}"` };
    }
  }
  
  // Check low priority
  for (let word of lowPriority) {
    if (lowerReason.includes(word)) {
      return { suggestion: "Reject", confidence: "Low", reason: `Contains casual keyword: "${word}"` };
    }
  }
  
  return { suggestion: "Review", confidence: "Low", reason: "No keywords detected" };
}