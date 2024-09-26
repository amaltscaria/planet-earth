export const generateCertificateNumber = () => {
  const now = new Date();
  const datePart = now
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 8); // YYYYMMDD
  const randomPart = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0"); // 4-digit random number
  return `${datePart}-${randomPart}`;
};
