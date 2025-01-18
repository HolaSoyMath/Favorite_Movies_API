import bcrypt from "bcrypt";

export async function generateHashValue(
  value: string | number,
  quantity: number = 10
): Promise<string> {
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error("The value must be a string or a number.");
  }

  const stringValue = value.toString();
  return await bcrypt.hash(stringValue, quantity);
}

export async function compareHashValue(
  value: string | number,
  compare: string | number
): Promise<boolean> {
  if (
    typeof value !== "string" &&
    typeof value !== "number" &&
    typeof compare !== "string" &&
    typeof compare !== "number"
  ) {
    throw new Error("The value must be a string or a number.");
  }

  return await bcrypt.compare(value.toString(), compare.toString());
}
