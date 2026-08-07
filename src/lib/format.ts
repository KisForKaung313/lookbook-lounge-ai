export function formatPrice(price: number | null | undefined, currency = "MMK") {
  if (price === null || price === undefined) return "Price on request";
  const value = Number(price);
  if (currency === "MMK") return `${value.toLocaleString("en-US")} MMK`;
  return `${currency} ${value.toLocaleString("en-US")}`;
}

export function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function firstName(name?: string | null) {
  if (!name) return "";
  return name.trim().split(/\s+/)[0] ?? "";
}
