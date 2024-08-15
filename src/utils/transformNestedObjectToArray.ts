export default function transformNestedObjectToArray(obj: any) {
  return Object.entries(obj).map(([id, value]: [any, any]) => ({
    id,
    ...value,
  }));
}
