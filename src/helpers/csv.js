import csvtojson from 'csvtojson';

export default async (csvFile) => {
  try {
    const productArray = await csvtojson().fromFile(
      `${csvFile.destination}/${csvFile.filename}`
    );

    const csvProducts = [];
    productArray.forEach((product) => {
      const csvProduct = {};
      [
        csvProduct.title,
        csvProduct.quantity,
        csvProduct.price,
        csvProduct.image,
      ] = Object.values(product);
      csvProducts.push(csvProduct);
    });
    return csvProducts;
  } catch (err) {
    console.log(err);
  }
};
