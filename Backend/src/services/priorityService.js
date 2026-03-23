export const calculatePriority = (deadline) => {
  if (!deadline) return 0;

  const now = new Date();

  // 🔥 parse thủ công
  const [year, month, day] = deadline.split("-");

  const due = new Date(year, month - 1, day);

  const diff = (due - now) / (1000 * 60 * 60);

  if (diff < 0) return 100;
  if (diff < 24) return 80;
  if (diff < 72) return 60;
  return 30;
};