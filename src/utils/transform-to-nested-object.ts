export default function transformToNestedObject(obj: any) {
  const { id, ...rest } = obj;
  return { [id]: rest };
}
