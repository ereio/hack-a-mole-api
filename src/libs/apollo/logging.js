
export const loggingMiddleware = async (resolve, root, args, context, info) => {
  const { fieldName } = info
  console.log(`[${fieldName}] ${JSON.stringify(args)}`)
  try {
    return await resolve(root, args, context, info)
  } catch (error) {
    console.error(`[${fieldName}]`, error);
    throw error;
  }
}
