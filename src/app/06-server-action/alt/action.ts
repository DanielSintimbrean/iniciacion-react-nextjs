"use server";

export async function contact({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  console.log({ name, email, message });
}
