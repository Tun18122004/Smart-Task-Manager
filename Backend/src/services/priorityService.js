export const calculatePriority = (deadline) => {
  if (!deadline) return 0;

  const now = new Date();
  const due = new Date(deadline);

  const diff = (due - now) / (1000 * 60 * 60); // giờ

  if (diff < 0) return 100;      // quá hạn
  if (diff < 24) return 80;      // < 1 ngày
  if (diff < 72) return 60;      // < 3 ngày
  return 30;
};