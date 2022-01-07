import pdf from 'pdf-creator-node';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export default async (data) => {
  const documentTemplate = await fs.promises.readFile(
    path.join(__dirname, 'products.html'),
    { encoding: 'utf-8' }
  );

  const options = {
    format: 'A4',
    orientation: 'portrait',
    border: '2mm',
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  };

  const document = {
    html: documentTemplate,
    data: { products: data },
    path: path.join(__dirname, `${uuidv4()}.pdf`),
  };
  const result = await pdf.create(document, options);
  console.log(result);
};
