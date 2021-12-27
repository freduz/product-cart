export const createDocument = async (service) => {
  try {
    const document = await service().create();
  } catch (err) {
    console.log(err);
  }
};
