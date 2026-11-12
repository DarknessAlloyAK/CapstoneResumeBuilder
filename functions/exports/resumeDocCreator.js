import { Document, Packer, Paragraph, TextRun, Header} from 'docx';
import { saveAs } from 'file-saver';

export default function GenerateDocument(data) {


    function newLine(text) {
        return new Paragraph({
            children: [
                new TextRun(text),
            ]
        })
    }

    // Create all information for document here



    // Sort that information and begin creating a list for children

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun('Hello World'),
              new TextRun({ text: ' Foo Bar', bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun('This is a second paragraph, with some '),
            new TextRun({ text: 'bold', bold: true }),
            ]})
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, 'resume.docx');
  });
}