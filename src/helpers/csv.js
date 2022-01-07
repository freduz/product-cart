import csvtojson from 'csvtojson';
import { prodcutLogger } from '../utils/logger';

export default async (csvFile, user) => {
  try {
    const productArray = await csvtojson().fromFile(
      `${csvFile.destination}/${csvFile.filename}`
    );

    const csvProducts = [];
    productArray.forEach((product) => {
      const csvProduct = {};
      [
        csvProduct.title,
        csvProduct.price,
        csvProduct.quantity,
        csvProduct.image,
      ] = Object.values(product);
      csvProduct.uploadedBy = user.id;
      csvProducts.push(csvProduct);
    });
    return csvProducts;
  } catch (err) {
    prodcutLogger.error(err);
  }
};
